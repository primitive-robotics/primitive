import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

type ModelProps = {
  url: string;
  modelXOffset?: number;
  modelYOffset?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableHoverRotation?: boolean;
};

function Model({ url, modelXOffset = 0, modelYOffset = 0, autoRotate = false, autoRotateSpeed = 0.35, enableHoverRotation = false }: ModelProps) {
  const gltf = useGLTF(url) as any;
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) {
      if (autoRotate) {
        ref.current.rotation.y += autoRotateSpeed * 0.01;
      }
      if (enableHoverRotation && hovered) {
        ref.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <primitive 
      ref={ref}
      object={gltf.scene} 
      position={[modelXOffset, modelYOffset, 0]} 
      scale={1.5}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

type ModelViewerProps = {
  url: string;
  width?: string | number;
  height?: string | number;
  modelXOffset?: number;
  modelYOffset?: number;
  enableMouseParallax?: boolean;
  enableHoverRotation?: boolean;
  environmentPreset?: "city" | "apartment" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse";
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  showScreenshotButton?: boolean;
};

export default function ModelViewer({ 
  url, 
  width = '100%', 
  height = 400, 
  modelXOffset = 0, 
  modelYOffset = 0, 
  enableMouseParallax = true,
  enableHoverRotation = true,
  environmentPreset = "city",
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  showScreenshotButton = false
}: ModelViewerProps) {
  return (
    <motion.div 
      initial={fadeIn ? { opacity: 0 } : false}
      animate={fadeIn ? { opacity: 1 } : false}
      transition={{ duration: 2 }}
      style={{ width, height, position: 'relative' }} 
      className="model-viewer-container"
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment={environmentPreset} intensity={0.5} adjustCamera={true}>
            <Model 
              url={url} 
              modelXOffset={modelXOffset} 
              modelYOffset={modelYOffset}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              enableHoverRotation={enableHoverRotation}
            />
          </Stage>
          {enableMouseParallax ? (
            <PresentationControls
              global
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            >
              {/* Controls handled by PresentationControls */}
            </PresentationControls>
          ) : (
            <OrbitControls enableZoom={false} />
          )}
          <Environment preset={environmentPreset} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
      {showScreenshotButton && (
        <button 
          className="absolute bottom-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-xs uppercase tracking-widest font-mono"
          onClick={() => {
            const canvas = document.querySelector('.model-viewer-container canvas');
            if (canvas) {
              const link = document.createElement('a');
              link.download = 'robot-capture.png';
              link.href = (canvas as HTMLCanvasElement).toDataURL();
              link.click();
            }
          }}
        >
          Capture
        </button>
      )}
    </motion.div>
  );
}
