/**
 * Color Palettes and Constants for History of Bitcoin
 */

// Orange Color Palette for scene objects
export const ORANGE_PALETTE = [
  0xffa500, // Orange
  0xff8c00, // Dark Orange
  0xf7931a, // Bitcoin Orange
  0xff4500, // Orange Red
  0xf6993c, // Sea Buckthorn
  0xed8e2e, // Carrot Orange
] as const;

// Purple Color Palette for text elements
export const PURPLE_PALETTE = [
  0x800080, // Purple
  0x9932cc, // Dark Orchid
  0x8b28d6, // Purple Heart
  0x3d0483, // Kingfisher Daisy
  0x301934, // Dark Purple
  0xac2c90, // Medium Red Violet
  0x3253ad, // Azure
  0x14001d, // Very Dark Purple, almost Black
] as const;

// Scene configuration
export const SCENE_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    initialZ: 720,
    targetZ: 600,
    animationDuration: 60, // seconds
  },
  lighting: {
    ambientIntensity: 2.7,
  },
  cloning: {
    spacing: 20,
    count: 40,
  },
  text: {
    size: [2.15, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3],
    height: 1,
    curveSegments: 12,
    scale: [1, 1, 0.15] as [number, number, number],
  },
} as const;

// Multilingual text content
export const TEXT_CONTENT = {
  english: {
    parts: [
      'If',
      "you don't believe me",
      "or don't get it,",
      "I don't have time to try",
      'to convince you, sorry',
    ],
    xOffsets: [-2.7, 0, 0, 0, 0, 3.4],
    additionalXOffsets: [0.1, 0, 0, 0, 0, 0.31],
    additionalYOffsets: [-2.67, -0.5, -1.0, -1.5, -2.0, -4.39],
  },
  spanish: {
    parts: [
      'Si',
      'no me crees',
      'o no lo entiendes,',
      'no tengo tiempo para intentar',
      'convencerte, lo siento',
    ],
    xOffsets: [-2.7, 0, 0, 0, 0, 3.4],
    additionalXOffsets: [-0.2, 0, 0, 0, 0, 0.31],
    additionalYOffsets: [-2.62, -0.5, -1.0, -1.5, -2.0, -4.39],
  },
  french: {
    parts: [
      'Si',
      'vous ne me croyez pas',
      'ou ne comprenez pas,',
      "je n'ai pas le temps d'essayer",
      'de vous convaincre, désolé',
    ],
    xOffsets: [-2.7, 0, 0, 0, 0, 3.4],
    additionalXOffsets: [-0.2, 0, 0, 0, 0, 0.31],
    additionalYOffsets: [-2.62, -0.5, -1.0, -1.5, -2.0, -4.39],
  },
  portuguese: {
    parts: [
      'Se',
      'não acredita em mim',
      'ou não entende,',
      'não tenho tempo para tentar',
      'convencê-lo, desculpe',
    ],
    xOffsets: [-2.7, 0, 0, 0, 0, 3.4],
    additionalXOffsets: [-1.3, 0, 0, 0, 0, 0.31],
    additionalYOffsets: [-2.62, -0.5, -1.0, -1.5, -2.0, -4.39],
  },
} as const;

export type Language = keyof typeof TEXT_CONTENT;
export const LANGUAGES: Language[] = ['english', 'spanish', 'french', 'portuguese'];
