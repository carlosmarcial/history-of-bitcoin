import { SCENE_CONFIG } from '../utils/constants';

/**
 * Scene lighting - Ambient light matching original scene
 */
export const Lights = () => {
  return (
    <ambientLight intensity={SCENE_CONFIG.lighting.ambientIntensity} color={0xffffff} />
  );
};
