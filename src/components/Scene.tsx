import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AnimatedCamera } from './AnimatedCamera';
import { Lights } from './Lights';
import { TunnelClones } from './Tunnel';
import { TextTunnel } from './TextTunnel';
import { useColorPalette } from '../hooks/useColorPalette';
import { useTextGenerator } from '../hooks/useTextGenerator';

/**
 * Main 3D scene component
 */
export const Scene = () => {
  const { colors, regenerateColors } = useColorPalette();
  const { textConfig, regenerateText } = useTextGenerator();

  const handleRegenerate = () => {
    regenerateColors();
    regenerateText();
  };

  return (
    <Canvas
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        preserveDrawingBuffer: true, // Required for canvas capture
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onClick={handleRegenerate}
      style={{ background: `#${colors.backgroundColor.toString(16).padStart(6, '0')}` }}
    >
      <AnimatedCamera />
      <Lights />

      <Suspense fallback={null}>
        <TunnelClones
          wallColor={colors.wallColor}
          floorColor={colors.floorColor}
          frameColor={colors.frameColor}
        />
        <TextTunnel textConfig={textConfig} textColor={colors.textColor} />
      </Suspense>
    </Canvas>
  );
};
