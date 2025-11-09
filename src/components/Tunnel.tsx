import { useMemo } from 'react';
import * as THREE from 'three';
import { SCENE_CONFIG } from '../utils/constants';

interface TunnelProps {
  wallColor: number;
  floorColor: number;
  frameColor: number;
}

/**
 * Single tunnel segment containing walls, floor, and door frame
 */
export const Tunnel = ({ wallColor, floorColor, frameColor }: TunnelProps) => {
  return (
    <group>
      {/* Walls */}
      <mesh position={[0, 10.88, -2]} scale={[1.44, 18.878, 1]}>
        <boxGeometry args={[1, 1, 1, 10, 10]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[37.2, 9.65, -2]} scale={[72.959, 21.34, 1]}>
        <boxGeometry args={[1, 1, 1, 10, 10]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-37.2, 9.65, -2]} scale={[72.959, 21.34, 1]}>
        <boxGeometry args={[1, 1, 1, 10, 10]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Floor plane */}
      <mesh
        position={[0, -1, 7.5]}
        scale={[30, 4, 1]}
        rotation-x={Math.PI * -0.5}
      >
        <planeGeometry args={[5, 5, 32]} />
        <meshStandardMaterial color={floorColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Door frame group */}
      <group>
        <mesh position={[-0.751, 0.22, -1.5]} scale={[-0.06, 2.45, 0.05]}>
          <boxGeometry args={[1, 1, 1, 10, 10]} />
          <meshStandardMaterial color={frameColor} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0.751, 0.22, -1.5]} scale={[-0.06, 2.45, 0.05]}>
          <boxGeometry args={[1, 1, 1, 10, 10]} />
          <meshStandardMaterial color={frameColor} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 1.475, -1.5]} scale={[1.562, 0.06, 0.05]}>
          <boxGeometry args={[1, 1, 1, 10, 10]} />
          <meshStandardMaterial color={frameColor} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Cloned tunnel segments repeated along Z-axis
 */
export const TunnelClones = ({ wallColor, floorColor, frameColor }: TunnelProps) => {
  const clones = useMemo(() => {
    const { spacing, count } = SCENE_CONFIG.cloning;
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      position: [0, 0, spacing * i] as [number, number, number],
    }));
  }, []);

  return (
    <>
      {clones.map(({ key, position }) => (
        <group key={key} position={position}>
          <Tunnel
            wallColor={wallColor}
            floorColor={floorColor}
            frameColor={frameColor}
          />
        </group>
      ))}
    </>
  );
};
