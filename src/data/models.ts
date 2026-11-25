/**
 * Hotel Vatika — 3D Scanned Photogrammetry Models Manifest
 * Photogrammetry scans of real signature dishes.
 * Includes Draco/KTX2 compression specs and instant real-photo fallback.
 */

export interface ScannedModelAsset {
  id: string;
  name: {
    en: string;
    mr: string;
    hi: string;
  };
  dishId: string;
  glbPath: string;
  fallbackPhoto: string;
  depthMap?: string;
  price: number;
  description: {
    en: string;
    mr: string;
    hi: string;
  };
  cameraPosition: [number, number, number];
  initialRotation: [number, number, number];
  scale: number;
  dracoCompressed: boolean;
  isRealAssetProvided: boolean;
}

export const SCANNED_MODELS: ScannedModelAsset[] = [
  {
    id: "model-vatika-special",
    dishId: "vatika-special-veg",
    name: {
      en: "Vatika Special Veg Handi",
      mr: "वाटिका स्पेशल व्हेज हांडी",
      hi: "वाटिका स्पेशल वेज हांडी",
    },
    glbPath: "/assets/models/vatika-special.glb",
    fallbackPhoto: "/assets/photos/food/vatika-special.webp",
    depthMap: "/assets/photos/food/vatika-special-depth.webp",
    price: 450,
    description: {
      en: "Interactive 3D photogrammetry scan of our chef's signature double-gravy handi.",
      mr: "आमच्या मुख्य शेफच्या स्वाक्षरी हांडी डिशचे त्रिमितीय वास्तववादी दर्शन.",
      hi: "हमारे मुख्य शेफ की सिग्नेचर हांडी डिश का वास्तविक 3D दृश्य।",
    },
    cameraPosition: [0, 1.2, 2.5],
    initialRotation: [0.35, -0.4, 0],
    scale: 1.1,
    dracoCompressed: true,
    isRealAssetProvided: true,
  },
  {
    id: "model-paneer-angara",
    dishId: "paneer-angara",
    name: {
      en: "Charcoal Paneer Angara",
      mr: "धुरकट पनीर अंगारा",
      hi: "स्मोकी पनीर अंगारा",
    },
    glbPath: "/assets/models/paneer-angara.glb",
    fallbackPhoto: "/assets/photos/food/paneer-angara.webp",
    depthMap: "/assets/photos/food/paneer-angara-depth.webp",
    price: 380,
    description: {
      en: "Smoked fresh paneer resting on a traditional charcoal brazier with aromatic spices.",
      mr: "कोळशाच्या मंद धुरावर शेकलेले ताजे पनीर आणि सुगंधी मसाल्यांची हांडी.",
      hi: "धीमी आंच और कोयले के धुएं में तैयार ताजा पनीर की हांडी।",
    },
    cameraPosition: [0, 1.2, 2.5],
    initialRotation: [0.3, 0.4, 0],
    scale: 1.1,
    dracoCompressed: true,
    isRealAssetProvided: true,
  },
  {
    id: "model-kaju-masala",
    dishId: "kaju-masala",
    name: {
      en: "Royal Kaju Masala",
      mr: "शाही काजू मसाला",
      hi: "शाही काजू मसाला",
    },
    glbPath: "/assets/models/kaju-masala.glb",
    fallbackPhoto: "/assets/photos/food/kaju-masala.webp",
    depthMap: "/assets/photos/food/kaju-masala-depth.webp",
    price: 370,
    description: {
      en: "Golden roasted whole cashews in rich brown onion-tomato butter gravy.",
      mr: "तूपामध्ये भाजलेले संपूर्ण काजू आणि खमंग कांदा-टोमॅटोची मसालेदार ग्रेव्ही.",
      hi: "देसी घी में भुने साबुत काजू और खुशबूदार भुने प्याज-टमाटर की गाढ़ी ग्रेवी।",
    },
    cameraPosition: [0, 1.2, 2.5],
    initialRotation: [0.4, -0.2, 0],
    scale: 1.1,
    dracoCompressed: true,
    isRealAssetProvided: true,
  },
];
