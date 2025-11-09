import { useState, useCallback } from 'react';
import { getRandomOrangeColor, getRandomPurpleColor } from '../utils/helpers';

export interface ColorPalette {
  wallColor: number;
  floorColor: number;
  frameColor: number;
  textColor: number;
  backgroundColor: number;
}

/**
 * Hook to manage scene color palette with regeneration capability
 */
export const useColorPalette = () => {
  const [colors, setColors] = useState<ColorPalette>(() => ({
    wallColor: getRandomOrangeColor(),
    floorColor: getRandomOrangeColor(),
    frameColor: getRandomOrangeColor(),
    textColor: getRandomPurpleColor(),
    backgroundColor: getRandomOrangeColor(),
  }));

  const regenerateColors = useCallback(() => {
    const newFloorColor = getRandomOrangeColor();
    setColors({
      wallColor: getRandomOrangeColor(),
      floorColor: newFloorColor,
      frameColor: getRandomOrangeColor(),
      textColor: getRandomPurpleColor(),
      backgroundColor: newFloorColor, // Match floor color
    });
  }, []);

  return { colors, regenerateColors };
};
