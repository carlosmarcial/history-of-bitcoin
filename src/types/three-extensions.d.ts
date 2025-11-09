import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { extend } from '@react-three/fiber';

// Extend R3F's JSX namespace with TextGeometry
declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

export {};
