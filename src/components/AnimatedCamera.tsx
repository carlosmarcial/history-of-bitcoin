import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { SCENE_CONFIG } from '../utils/constants';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';

/**
 * Animated camera using GSAP for smooth 60-second timeline
 */
export const AnimatedCamera = () => {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const { set } = useThree();

  useEffect(() => {
    if (!cameraRef.current) return;

    // Set this camera as the default camera
    set({ camera: cameraRef.current });

    // Create GSAP timeline for camera animation
    const tl = gsap.timeline();
    tl.to(cameraRef.current.position, {
      duration: SCENE_CONFIG.camera.animationDuration,
      z: SCENE_CONFIG.camera.targetZ,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, [set]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={SCENE_CONFIG.camera.fov}
      near={SCENE_CONFIG.camera.near}
      far={SCENE_CONFIG.camera.far}
      position={[0, 0, SCENE_CONFIG.camera.initialZ]}
    />
  );
};
