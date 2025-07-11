import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import ModelView from './ModelView';
import { useState, useRef, useEffect } from 'react';
import { yellowImg } from '../utils';
import * as THREE from 'three';
import { View } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { animateWithGsapTimeline } from "../utils/animations";
const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  // Camera control and model refs
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Refs for 3D models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Rotation states
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])
  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View>
                {/* Add your 3D content here */}
              </View>
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
          </div>
          <div className="flex-center">
            <ul className="color-container">
              {model.color.map((color, i) => (
                <li
                  key={i}
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setModel({
                      ...model,
                      color: [color],
                    })
                  }
                />
              ))}
            </ul>
            <div className="size-btn-container">
              {['small', 'large'].map((value) => (
                <button
                  key={value}
                  className={`size-btn ${
                    size === value ? 'selected' : ''
                  }`}
                  onClick={() => setSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
