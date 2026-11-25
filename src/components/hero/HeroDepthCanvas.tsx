"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroDepthCanvasProps {
  colorTextureUrl: string;
  depthTextureUrl?: string;
  fallbackPosterUrl: string;
  altText: string;
}

export const HeroDepthCanvas: React.FC<HeroDepthCanvasProps> = ({
  colorTextureUrl,
  depthTextureUrl,
  fallbackPosterUrl,
  altText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Mobile DPR cap at 1.5 as per performance mandate
    const maxDPR = window.innerWidth < 768 ? 1.5 : Math.min(window.devicePixelRatio, 2.0);
    renderer.setPixelRatio(maxDPR);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Custom 2.5D Parallax Depth Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform sampler2D uColor;
      uniform sampler2D uDepth;
      uniform vec2 uMouse;
      uniform vec2 uThreshold;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      varying vec2 vUv;

      // Cover scaling math to maintain aspect ratio without stretching
      vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imageRes) {
        float screenRatio = screenRes.x / screenRes.y;
        float imageRatio = imageRes.x / imageRes.y;
        vec2 scale = vec2(1.0);
        vec2 offset = vec2(0.0);

        if (screenRatio > imageRatio) {
          scale.y = imageRatio / screenRatio;
          offset.y = (1.0 - scale.y) * 0.5;
        } else {
          scale.x = screenRatio / imageRatio;
          offset.x = (1.0 - scale.x) * 0.5;
        }
        return uv * scale + offset;
      }

      void main() {
        vec2 coverUv = getCoverUv(vUv, uResolution, uImageResolution);
        
        // Sample depth map (white = foreground, black = background)
        float depth = texture2D(uDepth, coverUv).r;
        
        // Parallax shift calculation: foreground shifts more, background remains anchored
        vec2 displacement = uMouse * (depth - 0.5) * uThreshold;
        vec2 displacedUv = coverUv + displacement;

        // Clamp UVs to avoid edge bleeding
        displacedUv = clamp(displacedUv, vec2(0.001), vec2(0.999));
        
        vec4 color = texture2D(uColor, displacedUv);

        // Subtle warm vignette and film falloff
        float dist = distance(vUv, vec2(0.5));
        float vignette = smoothstep(0.85, 0.35, dist);
        color.rgb *= mix(0.78, 1.0, vignette);

        gl_FragColor = color;
      }
    `;

    const uniforms = {
      uColor: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uThreshold: { value: new THREE.Vector2(0.018, 0.014) },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1920, 1080) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Target mouse / gyro coordinates
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      // Normalized from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (prefersReducedMotion || !e.gamma || !e.beta) return;
      // Gamma: left-to-right tilt (-90 to 90), Beta: front-to-back tilt (-180 to 180)
      targetX = THREE.MathUtils.clamp(e.gamma / 30, -1, 1);
      targetY = THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    }

    // Load Textures
    const effectiveDepthUrl = depthTextureUrl || colorTextureUrl;
    let texturesLoaded = 0;

    const checkReady = () => {
      texturesLoaded++;
      if (texturesLoaded >= 2) {
        setIsLoaded(true);
      }
    };

    textureLoader.load(
      colorTextureUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        uniforms.uColor.value = tex;
        if (tex.image) {
          uniforms.uImageResolution.value.set(tex.image.width, tex.image.height);
        }
        checkReady();
      },
      undefined,
      () => setWebGLSupported(false)
    );

    textureLoader.load(
      effectiveDepthUrl,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        uniforms.uDepth.value = tex;
        checkReady();
      },
      undefined,
      () => checkReady()
    );

    // Visibility / Intersection Observer to pause rendering when offscreen
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation Loop with smooth dampening
    const render = () => {
      if (isVisible) {
        // Smooth camera dolly easing
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        uniforms.uMouse.value.set(currentX, currentY);

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Cleanup WebGL resources
      geometry.dispose();
      material.dispose();
      if (uniforms.uColor.value) uniforms.uColor.value.dispose();
      if (uniforms.uDepth.value) uniforms.uDepth.value.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [colorTextureUrl, depthTextureUrl]);

  if (!webGLSupported) {
    // Pure photographic fallback
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackPosterUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-transparent to-[#0E0C0A]/60" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 2.5D WebGL Depth Canvas */}
      <div
        ref={containerRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Immediate Low-CLS Image / Poster while WebGL loads */}
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallbackPosterUrl}
            alt={altText}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Cinematic dark vignettes over edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0E0C0A]/85 via-transparent to-[#0E0C0A] opacity-90" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#0E0C0A]/20 to-[#0E0C0A]/80" />
    </div>
  );
};
