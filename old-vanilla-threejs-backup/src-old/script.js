import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight }

window.addEventListener('resize', () =>
{ 
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 720
scene.add(camera)




// Adding Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.7); // Soft white light
scene.add(ambientLight);

// Background color
scene.background = new THREE.Color(0xCCCCCC); // Light grey background

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true,
    preserveDrawingBuffer: true  // Required for canvas capture
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// SuperAleatorio
const getRandom = (min, max) => Math.random() * (max - min) + min

let randomCeilingX = getRandom(0.1, 25)
let randomCeilingY = getRandom(0.1, 4)
let randomCeilingZ = getRandom(0.1, 5)

let randomRugX = getRandom(0.1, 12)
let randomRugY = getRandom(0.9, 14)
let randomRugZ = getRandom(0.1, 10)

// Orange Color Palette for materials
const orangePalette = [
  0xFFA500, // Orange
  0xFF8C00, // Dark Orange
  0xF7931A, // Bitcoin Orange
  0xFF4500, // Orange Red
  0xf6993c, // Sea Buckthorn
  0xed8e2e  // Carrot Orange
];

// Purple Color Palette for materials
const purplePalette = [
  0x800080, // Purple
  0x9932CC, // Dark Orchid
  0x8b28d6,  // Purple Heart
  0x3d0483, // Kingfisher Daisy
  0x301934, // Dark Purple
  0xac2c90, // Medium Red Violet
  0x3253ad,  // Azure
  0x14001D  // Very Dark Purple, almost Black
];


// Function to create a standard material with a color from the palette
const createStandardMaterial = () => {
  const color = orangePalette[Math.floor(Math.random() * orangePalette.length)];
  return new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide });
};


/**
 *  Geometry
 */

// Groups 
const group = new THREE.Group()
const frameGroup = new THREE.Group()

// Replace shader materials with standard materials
const wallMaterial = createStandardMaterial();
const ceilingMaterial = createStandardMaterial();
const frameMaterial = createStandardMaterial();
const rugMaterial = createStandardMaterial();
const floorMaterial = createStandardMaterial(orangePalette);
const textMaterial = createStandardMaterial();

// Background Color
scene.background = new THREE.Color(floorMaterial.color);

// Walls
const boxGeometry1 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box1 = new THREE.Mesh( boxGeometry1, wallMaterial )
box1.position.set(0, 10.88, -2)
box1.scale.set(1.44, 18.878, 1)

const boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box2 = new THREE.Mesh( boxGeometry2, wallMaterial )
box2.position.set(37.2, 9.65, -2)
box2.scale.set(72.959, 21.34, 1)

const boxGeometry3 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box3 = new THREE.Mesh( boxGeometry3, wallMaterial )
box3.position.set(-37.2, 9.65, -2)
box3.scale.set(72.959, 21.34, 1)

// Floorplane 
const planeGeometry = new THREE.PlaneGeometry( 5, 5, 32 )
const plane = new THREE.Mesh( planeGeometry, floorMaterial )
plane.position.set(0, -1, 7.5)
plane.scale.set(30, 4, 1)
plane.rotation.x = Math.PI * -0.5


// Door frame
const boxGeometry4 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box4 = new THREE.Mesh( boxGeometry4, frameMaterial )
box4.position.set(-0.751, 0.22, 0.5)
box4.scale.set(-0.06, 2.45, 0.05)

const boxGeometry5 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box5 = new THREE.Mesh( boxGeometry5, frameMaterial )
box5.position.set(0.751, 0.22, 0.5)
box5.scale.set(-0.06, 2.45, 0.05)

const boxGeometry6 = new THREE.BoxGeometry( 1, 1, 1, 10, 10 )
const box6 = new THREE.Mesh( boxGeometry6, frameMaterial )
box6.position.set(0, 1.475, 0.5)
box6.scale.set(1.562, 0.06, 0.05)

frameGroup.add( box4 )
frameGroup.add( box5 )
frameGroup.add( box6 )


// Add the objects to the group or scene
group.add( box1 )
group.add( box2 )
group.add( box3 )
group.add( plane )
group.add( frameGroup )


// Text with Cloner
const fontLoader = new FontLoader()
let textClonerGroup = new THREE.Group()

// Function to create text with random language
function createTextGroup(font) {
  const textMaterial = new THREE.MeshBasicMaterial({wireframe: false, color: purplePalette[Math.floor(Math.random() * purplePalette.length)]})
  // Define the text count and the increment
  const increment = 20
  const textCount = 40 * increment

  // Define the text parts with a 50% chance to choose between English and Spanish
let textParts;
const randomLanguage = Math.random();

if (randomLanguage < 0.25) {
  // English
  textParts = [
    "If",
    "you don't believe me",
    "or don't get it,",
    "I don't have time to try",
    "to convince you, sorry",
    Math.random() < 0.5 ? "Satoshi" : "Nakamoto"
  ];
} else if (randomLanguage < 0.5) {
  // Spanish
  textParts = [
    "Si",
    "no me crees",
    "o no lo entiendes,",
    "no tengo tiempo para intentar",
    "convencerte, lo siento",
    Math.random() < 0.5 ? "Satoshi" : "Nakamoto"
  ];
} else if (randomLanguage < 0.75) {
  // French
  textParts = [
    "Si",
    "vous ne me croyez pas",
    "ou ne comprenez pas,",
    "je n'ai pas le temps d'essayer",
    "de vous convaincre, désolé",
    Math.random() < 0.5 ? "Satoshi" : "Nakamoto"
  ];
} else {
  // Portuguese
  textParts = [
    "Se",
    "não acredita em mim",
    "ou não entende,",
    "não tenho tempo para tentar",
    "convencê-lo, desculpe",
    Math.random() < 0.5 ? "Satoshi" : "Nakamoto"
  ];
}

  // Define the x-offsets for each line of text
  let xOffset = [
    -2.7, // x-offset for 'If'
    0, // x-offset for 'you dont believe me'
    0, // x-offset for 'or dont get it,'
    0, // x-offset for 'I dont have time to try'
    0, // x-offset for 'to convince you, sorry.'
    3.4 // x-offset for 'Satoshi/Nakamoto'
  ];
  // Define the y-offset ratio
  let yOffsetRatio = 0.15;
  // Generate the y-offsets for each line of text using yOffsetRatio
  let yOffsetFromRatio = [];
  for (let i = textParts.length - 1; i >= 0; i--) {
    yOffsetFromRatio.push(i * yOffsetRatio);
  }

// Define the additional y-offsets for each line of text
let additionalYOffset;
if (randomLanguage < 0.25) {
  // English
  additionalYOffset = [
    -2.67, // Additional y-offset for 'If'
    -0.5, // Additional y-offset for 'you dont believe me'
    -1.0, // Additional y-offset for 'or dont get it,'
    -1.5, // Additional y-offset for 'I dont have time to try'
    -2.0, // Additional y-offset for 'to convince you, sorry.'
    -4.39 // Additional y-offset for 'Satoshi/Nakamoto'
  ];
} else if (randomLanguage < 0.5) {
  // Spanish
  additionalYOffset = [
    -2.62, // Additional y-offset for 'Si'
    -0.5, // Additional y-offset for 'no me crees'
    -1.0, // Additional y-offset for 'o no lo entiendes,'
    -1.5, // Additional y-offset for 'no tengo tiempo para intentar'
    -2.0, // Additional y-offset for 'convencerte, lo siento.'
    -4.39 // Additional y-offset for 'Satoshi/Nakamoto'
  ];
} else if (randomLanguage < 0.75) {
  // French
  additionalYOffset = [
    -2.62, // Additional y-offset for 'Si'
    -0.5, // Additional y-offset for 'vous ne me croyez pas'
    -1.0, // Additional y-offset for 'ou ne comprenez pas,'
    -1.5, // Additional y-offset for 'je n'ai pas le temps d'essayer'
    -2.0, // Additional y-offset for 'de vous convaincre, désolé.'
    -4.39 // Additional y-offset for 'Satoshi/Nakamoto'
  ];
} else {
  // Portuguese
  additionalYOffset = [
    -2.62, // Additional y-offset for 'Se'
    -0.5, // Additional y-offset for 'não acredita em mim'
    -1.0, // Additional y-offset for 'ou não entende,'
    -1.5, // Additional y-offset for 'não tenho tempo para tentar'
    -2.0, // Additional y-offset for 'convencê-lo, desculpe.'
    -4.39 // Additional y-offset for 'Satoshi/Nakamoto'
  ];
}

// Define the additional x-offsets for each line of text
let additionalXOffset;
if (randomLanguage < 0.25) {
  // English
  additionalXOffset = [
    0.1, // Additional x-offset for 'If'
    0, // Additional x-offset for 'you dont believe me'
    0, // Additional x-offset for 'or dont get it,'
    0, // Additional x-offset for 'I dont have time to try'
    0, // Additional x-offset for 'to convince you, sorry.'
    0.31  // Additional x-offset for 'Satoshi/Nakamoto'
  ];
} else if (randomLanguage < 0.5) {
  // Spanish
  additionalXOffset = [
    -0.2, // Additional x-offset for 'Si'
    0, // Additional x-offset for 'no me crees'
    0, // Additional x-offset for 'o no lo entiendes,'
    0, // Additional x-offset for 'no tengo tiempo para intentar'
    0, // Additional x-offset for 'convencerte, lo siento.'
    0.31  // Additional x-offset for 'Satoshi/Nakamoto'
  ];
} else if (randomLanguage < 0.75) {
  // French
  additionalXOffset = [
    -0.2, // Additional x-offset for 'Si'
    0, // Additional x-offset for 'vous ne me croyez pas'
    0, // Additional x-offset for 'ou ne comprenez pas,'
    0, // Additional x-offset for 'je n'ai pas le temps d'essayer'
    0, // Additional x-offset for 'de vous convaincre, désolé.'
    0.31  // Additional x-offset for 'Satoshi/Nakamoto'
  ];
} else {
  // Portuguese
  additionalXOffset = [
    -1.3, // Additional x-offset for 'Se'
    0, // Additional x-offset for 'não acredita em mim'
    0, // Additional x-offset for 'ou não entende,'
    0, // Additional x-offset for 'não tenho tempo para tentar'
    0, // Additional x-offset for 'convencê-lo, desculpe.'
    0.31  // Additional x-offset for 'Satoshi/Nakamoto'
  ];
}

  // Define the text sizes for each line of text
  let textSize = [
    2.15, // Text size for 'If'
    0.4, // Text size for 'you dont believe me'
    0.4, // Text size for 'or dont get it,'
    0.4, // Text size for 'I dont have time'
    0.4, // Text size for 'to try to convince you,'
    0.4, // Text size for 'sorry.'
    0.3 // Text size for 'Satoshi/Nakamoto'
  ];

  for (let i = 0; i < textCount; i += increment) {
    for (let j = 0; j < textParts.length; j++) {
      const textGeometry = new TextGeometry(
        textParts[j],
        {
          font: font,
          size: textSize[j], // Use the text size for this line
          height: 1,
          curveSegments: 12,  // Increased for smoother text curves
          bevelEnabled: false,
          bevelThickness: 0.1,
          bevelSize: 0.005,
          bevelOffset: 0.01,
          bevelSegments: 1
        }
      )
      const text = new THREE.Mesh(textGeometry, textMaterial)
      text.position.set(xOffset[j] + additionalXOffset[j], yOffsetFromRatio[j] + additionalYOffset[j], i);
      text.scale.set(1, 1, 0.15)
      textClonerGroup.add(text)
    }
  }

  // Move the entire group closer to the camera on the z-axis
  textClonerGroup.position.z = 0.4
  textClonerGroup.position.y = 3.45
  textClonerGroup.position.x = -2.9
  scene.add(textClonerGroup)
}

// Load font and create initial text
fontLoader.load('./fonts/cabal_regular.json', font => {
  window.cachedFont = font; // Cache the font for reuse
  createTextGroup(font);
})


// Cloner Rest
let n = 20;
let numClones = 40;

const cloneGroup = (group, n, numClones) => {
    let clonedGroup = new THREE.Group();
  
    for (let i = 0; i < numClones; i++) {
      group.children.forEach(function (child) {
        let clonedChild = child.clone();
        clonedChild.position.z = n * i;
        clonedGroup.add(clonedChild);
        
      });
    }
  
    return clonedGroup;
}

const clonedGroup = cloneGroup(group, n, numClones);
scene.add( clonedGroup );

// Function to regenerate scene with new colors and text
function regenerateScene() {
  // Only proceed if font is loaded
  if (!window.cachedFont) return;
  
  // Create new materials with random colors
  const newWallMaterial = createStandardMaterial();
  const newFloorMaterial = createStandardMaterial();
  const newFrameMaterial = createStandardMaterial();
  
  // Update wall materials
  box1.material = newWallMaterial;
  box2.material = newWallMaterial;
  box3.material = newWallMaterial;
  
  // Update floor material
  plane.material = newFloorMaterial;
  
  // Update frame materials
  box4.material = newFrameMaterial;
  box5.material = newFrameMaterial;
  box6.material = newFrameMaterial;
  
  // Update scene background to match floor
  scene.background = new THREE.Color(newFloorMaterial.color);
  
  // Remove old text group
  scene.remove(textClonerGroup);
  textClonerGroup.clear();
  
  // Create new text group with different language
  createTextGroup(window.cachedFont);
}

// Add click event listener
canvas.addEventListener('click', regenerateScene);



// Alternative: Export as canvas image (for reference)
function exportViewportAsImage() {
  // This captures EXACTLY what you see
  const dataURL = renderer.domElement.toDataURL('image/png');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `viewport_exact_${timestamp}.png`;
  
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  console.log(`Viewport image exported: ${filename}`);
}

// Helper: Extract color from any Three.js material
function extractMaterialColor(material) {
  if (!material) return '#888888';
  
  // Handle different material types
  if (material.color) {
    return '#' + material.color.getHexString();
  } else if (material.emissive) {
    return '#' + material.emissive.getHexString();
  } else if (material.isLineBasicMaterial) {
    return '#' + material.color.getHexString();
  }
  
  // Default fallback
  return '#888888';
}

// Helper: Calculate depth of mesh center from camera
function calculateMeshDepth(mesh, camera) {
  const meshWorldPosition = new THREE.Vector3();
  mesh.getWorldPosition(meshWorldPosition);
  
  // Transform to camera space
  const cameraWorldMatrix = camera.matrixWorldInverse;
  meshWorldPosition.applyMatrix4(cameraWorldMatrix);
  
  return meshWorldPosition.z;
}

// Helper: Sort meshes by depth (painter's algorithm)
function depthSortMeshes(meshes, camera) {
  return meshes.slice().sort((a, b) => {
    const depthA = calculateMeshDepth(a, camera);
    const depthB = calculateMeshDepth(b, camera);
    return depthA - depthB; // Sort back to front
  });
}

// Helper: Collect all visible meshes from scene
function collectVisibleMeshes(object, camera, meshes = []) {
  if (object.visible === false) return meshes;
  
  if (object.isMesh || object.isLine || object.isPoints) {
    // Check if in camera frustum (basic check)
    const frustum = new THREE.Frustum();
    const cameraMatrix = new THREE.Matrix4();
    cameraMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraMatrix);
    
    if (object.geometry && object.geometry.boundingSphere) {
      object.geometry.computeBoundingSphere();
      const sphere = object.geometry.boundingSphere.clone();
      sphere.applyMatrix4(object.matrixWorld);
      
      if (frustum.intersectsSphere(sphere)) {
        meshes.push(object);
      }
    } else {
      meshes.push(object);
    }
  }
  
  // Recurse through children
  if (object.children) {
    object.children.forEach(child => {
      collectVisibleMeshes(child, camera, meshes);
    });
  }
  
  return meshes;
}

// Helper: Convert material for SVG compatibility
function prepareMaterialForSVG(material) {
  if (!material) return new THREE.MeshBasicMaterial({ color: 0x888888 });
  
  const color = extractMaterialColor(material);
  const newMaterial = new THREE.MeshBasicMaterial({
    color: color,
    side: material.side || THREE.FrontSide,
    transparent: material.transparent || false,
    opacity: material.opacity || 1.0,
    wireframe: material.wireframe || false
  });
  
  return newMaterial;
}

// Main SVG export function with enhanced features
function exportSceneAsSVG(quality = 'standard') {
  console.log(`=== SVG Export Starting (${quality} quality) ===`);
  
  // Show loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-family: monospace;
    z-index: 10000;
  `;
  loadingDiv.textContent = 'Generating SVG export...';
  document.body.appendChild(loadingDiv);
  
  // Store timeline state and pause animation during export
  const timelineWasPlaying = !tl.paused();
  if (timelineWasPlaying) {
    tl.pause();
    console.log('Paused animation for SVG export');
  }
  
  try {
    // Quality settings
    let scale = 1;
    let precision = 2;
    let overdraw = 0;
    
    switch(quality) {
      case 'high':
        scale = 2;
        precision = 3;
        overdraw = 0.5;
        break;
      case 'ultra':
        scale = 4;
        precision = 4;
        overdraw = 1;
        break;
    }
    
    // Create SVG renderer
    const svgRenderer = new SVGRenderer();
    svgRenderer.setSize(sizes.width * scale, sizes.height * scale);
    svgRenderer.setQuality(quality === 'ultra' ? 'high' : 'low');
    svgRenderer.setPrecision(precision);
    svgRenderer.overdraw = overdraw;
    
    // Store original materials and temporarily replace with SVG-compatible ones
    const materialBackup = new Map();
    
    scene.traverse(object => {
      if (object.isMesh && object.material) {
        // Backup original material
        materialBackup.set(object, object.material);
        // Temporarily replace with SVG-compatible material
        object.material = prepareMaterialForSVG(object.material);
      }
    });
    
    // Ensure camera and scene matrices are up to date before rendering
    camera.updateMatrixWorld(true);
    camera.updateProjectionMatrix();
    scene.updateMatrixWorld(true);
    
    // Debug camera state
    console.log('Camera state during SVG export:');
    console.log('- Position:', camera.position.x, camera.position.y, camera.position.z);
    console.log('- Rotation:', camera.rotation.x, camera.rotation.y, camera.rotation.z);
    console.log('- FOV:', camera.fov);
    console.log('- Aspect:', camera.aspect);
    console.log('- Near/Far:', camera.near, camera.far);
    
    // Render the original scene directly to maintain camera perspective
    console.log('Rendering scene to SVG...');
    svgRenderer.render(scene, camera);
    
    // Restore original materials immediately after render
    materialBackup.forEach((originalMaterial, mesh) => {
      mesh.material = originalMaterial;
    });
    
    // Get SVG content
    const svgElement = svgRenderer.domElement;
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('viewBox', `0 0 ${sizes.width * scale} ${sizes.height * scale}`);
    
    // Optimize SVG output
    const svgContent = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + 
                      svgElement.outerHTML;
    
    // Create filename and download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `scene_vector_${quality}_${timestamp}.svg`;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`SVG exported: ${filename}`);
    console.log(`Quality: ${quality}`);
    console.log(`Scale: ${scale}x`);
    console.log(`File size: ${(blob.size / 1024).toFixed(2)} KB`);
    console.log('=== End SVG Export ===');
    
  } catch (error) {
    console.error('Error during SVG export:', error);
    alert(`Failed to export SVG: ${error.message}`);
  } finally {
    // Remove loading indicator
    if (document.body.contains(loadingDiv)) {
      document.body.removeChild(loadingDiv);
    }
    
    // Resume animation if it was playing
    if (timelineWasPlaying) {
      tl.resume();
      console.log('Resumed animation after SVG export');
    }
  }
}



// Add keyboard event listeners for export
window.addEventListener('keydown', (event) => {
  if (event.key === 'p' || event.key === 'P') {
    exportViewportAsImage(); // PNG export (exact appearance)
  } else if (event.key === 'v') {
    exportSceneAsSVG('standard'); // Standard quality SVG export
  } else if (event.key === 'V') {
    exportSceneAsSVG('high'); // High quality SVG export (Shift+V)
  } else if (event.key === 'u' || event.key === 'U') {
    exportSceneAsSVG('ultra'); // Ultra quality SVG export
  }
});


/**
 *  Animate
 */
const clock = new THREE.Clock();
let frameCount = 0;

// 2 minutes at 30fps: 2 minutes * 60 seconds/minute * 30 frames/second = 3600 frames
const maxFrames = 450; 

// GSAP timeline
// const tl = gsap.timeline({repeat: -1});
// tl.to(camera.position, {duration: 0, z: 600, ease: "none", repeat: -1});

const tl = gsap.timeline();
tl.to(camera.position, {duration: 60, z: 600, ease: "none", repeat: -1});

// Initialize CCapture
// const capturer = new CCapture({
//     format: 'webm',
//     framerate: 30,
//     verbose: true,
//     name: 'aMessageWorthRepeating'
// });

// Function to trigger the generative change in your scene
// const triggerGenerativeChange = () => {

//   // Function logic to change the wall color
//   changeWallColor();

//   // Function logic to change the ceiling color
//   changeCeilingColor();

//   // Function logic to change the rug color
//   changeRugColor();

//   // Function logic to change the floor color
//   changeFloorColor();

//   // Logic for ceiling group scale
//   const getRandom = (min, max) => Math.random() * (max - min) + min;
//   let randomCeilingX = getRandom(0.1, 5);
//   let randomCeilingY = getRandom(0.1, 2);
//   clonedCeilingGroup.scale.x = randomCeilingX;
//   clonedCeilingGroup.scale.y = randomCeilingY;

//   // Logic for rug group scale
//   let randomRugX = getRandom(0.1, 3);
//   let randomRugY = getRandom(0.4, 3);
//   clonedRugGroup.scale.set(randomRugX, randomRugY, 1);

// };

// Interval for triggering the generative change every 20 seconds
// const generativeChangeInterval = 20;
// let lastTriggerTime = 0;

const animate = () => {
  // const elapsedTime = clock.getElapsedTime();
  
  // Progress GSAP timeline manually
  const progress = (frameCount / maxFrames) * 12;  // Updated for 2 minutes duration
  tl.progress(progress / tl.duration());

  // Trigger the generative change based on the interval
  // if (elapsedTime - lastTriggerTime >= generativeChangeInterval) {
  //     triggerGenerativeChange();
  //     lastTriggerTime = elapsedTime;
  // }


  // Render
  renderer.render(scene, camera);

  // Capture the frame
  // capturer.capture(renderer.domElement);

  // Increment the frame count
  frameCount++;

  // If we haven't reached the max number of frames, request another frame
  // if (frameCount < maxFrames) {
  //     requestAnimationFrame(animate);
  // } else {
  //     capturer.stop(); // Stop the capturer
  //     capturer.save(); // Then save the file
  // }
  
  // Continue animating
  requestAnimationFrame(animate);

};

// Start the capturing process
// capturer.start();
animate();

