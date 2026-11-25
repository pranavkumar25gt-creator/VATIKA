/**
 * Hotel Vatika — Master Video Manifest
 * Optimized MP4 (H.264), WebM (VP9/AV1), mobile lightweight cuts, and posters
 */

export interface VideoAsset {
  id: string;
  category: "food" | "interior" | "hall" | "event" | "exterior";
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  mp4: string;
  webm: string;
  mobileMp4?: string;
  poster: string;
  loop: boolean;
  muted: boolean;
  isRealAssetProvided: boolean;
  aspectRatio: string;
}

export const VIDEO_MANIFEST: VideoAsset[] = [
  {
    id: "hero-plating-cinematic",
    category: "food",
    title: {
      en: "Artisanal Plating of Signature Paneer Angara & Swirling Steam",
      mr: "पनीर अंगाराची कलात्मक सजावट आणि वाफाळणारा नैसर्गिक सुगंध",
      hi: "पनीर अंगारा की कलात्मक सजावट और उठता हुआ प्राकृतिक धुआं",
    },
    mp4: "/assets/video/hero-plating.mp4",
    webm: "/assets/video/hero-plating.webm",
    mobileMp4: "/assets/video/hero-plating-mobile.mp4",
    poster: "/assets/photos/food/paneer-angara-macro.webp",
    loop: true,
    muted: true,
    isRealAssetProvided: true,
    aspectRatio: "16/9",
  },
  {
    id: "place-walkthrough-entrance",
    category: "exterior",
    title: {
      en: "Evening Entrance and Warm Lantern-Lit Approach",
      mr: "संध्याकाळच्या वेळी मुख्य प्रवेशद्वार आणि उबदार स्वागत",
      hi: "संध्या समय मुख्य द्वार और शांत रोशनी से सजा स्वागत मार्ग",
    },
    mp4: "/assets/video/entrance-walkthrough.mp4",
    webm: "/assets/video/entrance-walkthrough.webm",
    poster: "/assets/photos/exterior/facade-twilight.webp",
    loop: true,
    muted: true,
    isRealAssetProvided: true,
    aspectRatio: "16/9",
  },
  {
    id: "place-dining-ambiance",
    category: "interior",
    title: {
      en: "Warm Dining Ambiance with Gleaming Brass and Happy Families",
      mr: "कुटुंबासह भोजनाचा आनंद आणि पितळी भांड्यांची सोनेरी चमक",
      hi: "परिवार के साथ भोजन का आनंद और पीतल के बर्तनों की चमक",
    },
    mp4: "/assets/video/dining-ambiance.mp4",
    webm: "/assets/video/dining-ambiance.webm",
    poster: "/assets/photos/interior/main-dining-hall.webp",
    loop: true,
    muted: true,
    isRealAssetProvided: true,
    aspectRatio: "16/9",
  },
];
