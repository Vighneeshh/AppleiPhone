import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';  // Assuming .gbl file is GLTF/GLB
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const GBLModel = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);  // Load the .gbl file (can be .glb or .gltf)

  return (
    <mesh>
      <primitive object={gltf.scene} scale={[1, 1, 1]} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <GBLModel url="/path/to/your/model.gbl" /> {/* Update with your .gbl model path */}
    </Canvas>
  );
};

export default App;
