import { useMemo } from 'react';
import { Text3D } from '@react-three/drei';
import { SCENE_CONFIG } from '../utils/constants';
import type { TextConfig } from '../hooks/useTextGenerator';

interface TextTunnelProps {
  textConfig: TextConfig;
  textColor: number;
}

/**
 * 3D text tunnel with multilingual support and cloning
 */
export const TextTunnel = ({ textConfig, textColor }: TextTunnelProps) => {

  const textMeshes = useMemo(() => {
    const { spacing, count } = SCENE_CONFIG.cloning;
    const textCount = count * spacing;
    const increment = spacing;
    const meshes: Array<{
      key: string;
      text: string;
      position: [number, number, number];
      size: number;
      scale: [number, number, number];
    }> = [];

    const { parts, xOffsets, additionalXOffsets, additionalYOffsets, signature } = textConfig;
    const allParts = [...parts, signature];
    const textSizes = SCENE_CONFIG.text.size;
    const yOffsetRatio = 0.15;

    for (let i = 0; i < textCount; i += increment) {
      for (let j = 0; j < allParts.length; j++) {
        const yOffsetFromRatio = (allParts.length - 1 - j) * yOffsetRatio;
        const xPos = xOffsets[j] + additionalXOffsets[j];
        const yPos = yOffsetFromRatio + additionalYOffsets[j];
        const zPos = i;

        meshes.push({
          key: `text-${i}-${j}`,
          text: allParts[j],
          position: [xPos, yPos, zPos],
          size: textSizes[j],
          scale: SCENE_CONFIG.text.scale,
        });
      }
    }

    return meshes;
  }, [textConfig]);

  return (
    <group position={[-2.9, 3.45, -1.6]}>
      {textMeshes.map(({ key, text, position, size, scale }) => (
        <Text3D
          key={key}
          font="/fonts/cabal_regular.json"
          size={size}
          height={SCENE_CONFIG.text.height}
          curveSegments={SCENE_CONFIG.text.curveSegments}
          bevelEnabled={false}
          position={position}
          scale={scale}
        >
          {text}
          <meshBasicMaterial color={textColor} />
        </Text3D>
      ))}
    </group>
  );
};
