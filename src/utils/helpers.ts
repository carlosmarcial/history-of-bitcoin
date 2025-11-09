import { ORANGE_PALETTE, PURPLE_PALETTE } from './constants';

/**
 * Get random number between min and max
 */
export const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Get random color from orange palette
 */
export const getRandomOrangeColor = (): number => {
  return ORANGE_PALETTE[Math.floor(Math.random() * ORANGE_PALETTE.length)];
};

/**
 * Get random color from purple palette
 */
export const getRandomPurpleColor = (): number => {
  return PURPLE_PALETTE[Math.floor(Math.random() * PURPLE_PALETTE.length)];
};

/**
 * Get random language (25% chance each)
 */
export const getRandomLanguage = (): 'english' | 'spanish' | 'french' | 'portuguese' => {
  const rand = Math.random();
  if (rand < 0.25) return 'english';
  if (rand < 0.5) return 'spanish';
  if (rand < 0.75) return 'french';
  return 'portuguese';
};

/**
 * Get random signature (Satoshi or Nakamoto)
 */
export const getRandomSignature = (): string => {
  return Math.random() < 0.5 ? 'Satoshi' : 'Nakamoto';
};
