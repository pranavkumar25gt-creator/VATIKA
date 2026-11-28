"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RotateCw, Image as ImageIcon } from "lucide-react";
import { ScannedModelAsset } from "@/data/models";
import { Language, translations } from "@/i18n";
import { VegBadge } from "../ui/VegBadge";

interface DishModelViewerProps {
  model: ScannedModelAsset;
  currentLang: Language;
  onClose?: () => void;
}

export const DishModelViewer: React.FC<DishModelViewerProps> = ({
  model,
  currentLang,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations[currentLang];

  useEffect(() => {
    if (viewMode === "photo") return;

    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animationFrameId: number;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(model.cameraPosition[0], model.cameraPosition[1], model.cameraPosition[2]);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      });
    } catch {
      setLoadError(true);
      setViewMode("photo");
      return;
    }

    const maxDPR = window.innerWidth < 768 ? 1.5 : Math.min(window.devicePixelRatio, 2.0);
    renderer.setPixelRatio(maxDPR);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Physically-based warm interior lighting (Warm Key + Aged Gold Bounce + Ambient)
    const keyLight = new THREE.DirectionalLight("#FFE8C4", 3.2);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#CBB079", 2.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight("#FFF0D4", 1.8);
    scene.add(ambientLight);

    // Soft Contact Shadow Plane beneath the handi
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x05130e,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.35;
    scene.add(shadowMesh);

    // Dish Model Group Node
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Interactive Drag / Orbit controls simulation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = model.initialRotation[1];
    let targetRotationX = model.initialRotation[0];

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.2, Math.min(1.0, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile pinch/rotate
    let prevTouchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      targetRotationY += deltaX * 0.01;
      prevTouchX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    domEl.addEventListener("touchmove", onTouchMove, { passive: true });
    domEl.addEventListener("touchend", onTouchEnd);

    // Photogrammetry Procedural Handi Materialization
    const handiGeo = new THREE.CylinderGeometry(0.85, 0.6, 0.75, 32);
    const handiMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1612,
      roughness: 0.45,
      metalness: 0.85,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.2,
    });
    const handiMesh = new THREE.Mesh(handiGeo, handiMat);
    handiMesh.position.y = 0.1;
    modelGroup.add(handiMesh);

    // Stew / Curry Surface Disk
    const curryGeo = new THREE.CircleGeometry(0.8, 32);
    const curryMat = new THREE.MeshPhysicalMaterial({
      color: model.dishId === "paneer-angara" ? 0x9c3114 : model.dishId === "kaju-masala" ? 0x9b5d22 : 0xba6a20,
      roughness: 0.35,
      metalness: 0.1,
      reflectivity: 0.8,
      clearcoat: 0.7,
    });
    const curryMesh = new THREE.Mesh(curryGeo, curryMat);
    curryMesh.rotation.x = -Math.PI / 2;
    curryMesh.position.y = 0.46;
    modelGroup.add(curryMesh);

    // Cottage Cheese Cubes Garnish
    const paneerGeo = new THREE.BoxGeometry(0.22, 0.18, 0.22);
    const paneerMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedb,
      roughness: 0.9,
    });
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(paneerGeo, paneerMat);
      const angle = (i * Math.PI) / 2 + 0.3;
      p.position.set(Math.cos(angle) * 0.35, 0.54, Math.sin(angle) * 0.35);
      p.rotation.y = i * 0.8;
      modelGroup.add(p);
    }

    // Coriander Leaf Sprigs
    const leafGeo = new THREE.PlaneGeometry(0.12, 0.16);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.rotation.x = -Math.PI / 2 + 0.2;
      leaf.rotation.z = i * 1.2;
      leaf.position.set((Math.random() - 0.5) * 0.5, 0.56, (Math.random() - 0.5) * 0.5);
      modelGroup.add(leaf);
    }

    // Try loading scanned GLB if provided
    if (model.glbPath) {
      const loader = new GLTFLoader();
      loader.load(
        model.glbPath,
        (gltf: GLTF) => {
          if (!isMounted) return;
          modelGroup.clear();
          const obj = gltf.scene;
          obj.scale.set(model.scale, model.scale, model.scale);
          obj.position.y = -0.2;
          modelGroup.add(obj);
          setIsLoading(false);
        },
        undefined,
        () => {
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }

    // Visibility / Intersection Observer to pause WebGL rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Gentle Auto-Rotation & Rendering Loop (Pauses when offscreen)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Completely skip rendering when not in viewport!

      if (!isDragging) {
        targetRotationY += 0.003;
      }

      modelGroup.rotation.y += (targetRotationY - modelGroup.rotation.y) * 0.08;
      modelGroup.rotation.x += (targetRotationX - modelGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      domEl.removeEventListener("touchmove", onTouchMove);
      domEl.removeEventListener("touchend", onTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [model, viewMode]);

  return (
    <div className="relative w-full bg-[#143328] border border-[#CBB079]/25 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#F6F1E8]/10 bg-[#102820]/90">
        <div className="flex items-center space-x-3">
          <VegBadge size="md" />
          <div>
            <h3 className="font-serif-editorial text-lg sm:text-xl text-[#F6F1E8] font-medium leading-tight">
              {model.name[currentLang]}
            </h3>
            <span className="text-[11px] font-mono text-[#CBB079]">
              ₹{model.price} • Chef&apos;s Signature
            </span>
          </div>
        </div>

        {/* View Mode Switcher Pill */}
        <div className="flex items-center bg-[#0D221A] border border-[#F6F1E8]/15 rounded-full p-0.5 text-xs">
          <button
            onClick={() => setViewMode("3d")}
            disabled={loadError}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-colors ${
              viewMode === "3d"
                ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                : "text-[#F6F1E8]/60 hover:text-[#F6F1E8]"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interactive 3D</span>
          </button>
          <button
            onClick={() => setViewMode("photo")}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-colors ${
              viewMode === "photo"
                ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                : "text-[#F6F1E8]/60 hover:text-[#F6F1E8]"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Real Photo</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#0D221A] overflow-hidden">
        {/* Real Photo Baseline */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={model.fallbackPhoto}
            alt={model.name[currentLang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D221A] via-transparent to-transparent opacity-80" />
        </div>

        {/* 3D WebGL Canvas Layer */}
        {viewMode === "3d" && !loadError && (
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            <div className="absolute bottom-4 left-4 pointer-events-none bg-[#0D221A]/85 backdrop-blur-sm border border-[#CBB079]/20 px-3.5 py-1.5 rounded-full text-[10px] text-[#F6F1E8]/80 font-mono tracking-wider uppercase">
              {t.food.rotateToInspect}
            </div>
          </div>
        )}

        {/* Pure Photo View Badge */}
        {viewMode === "photo" && (
          <div className="absolute bottom-4 left-4 bg-[#0D221A]/85 backdrop-blur-sm border border-[#CBB079]/20 px-3.5 py-1.5 rounded-full text-[10px] text-[#A5D6A7] font-mono tracking-wider uppercase">
            {t.food.realPhotoFallback}
          </div>
        )}
      </div>

      {/* Caption & Description Footer */}
      <div className="p-4 md:p-6 bg-[#102820] border-t border-[#F6F1E8]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <p className="text-[#F6F1E8]/80 leading-relaxed max-w-xl font-sans-clean">
          {model.description[currentLang]}
        </p>
        <a
          href="#menu"
          className="text-[#CBB079] hover:text-[#E2CD9A] uppercase tracking-widest text-[11px] font-mono whitespace-nowrap font-medium"
        >
          View on Full Menu →
        </a>
      </div>
    </div>
  );
};
