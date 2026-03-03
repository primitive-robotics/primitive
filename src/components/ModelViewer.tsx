import React, { Suspense, useRef, useState, useEffect, Component } from 'react';
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

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ModelViewer: gltf loaded for', url, { scene: gltf?.scene });
  }, [gltf, url]);

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

class ErrorBoundary extends Component<{ children?: React.ReactNode }, { error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    // surface debugging info in the console
    // eslint-disable-next-line no-console
    console.error('ModelViewer Error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center w-full h-full text-white/80 p-4">
          <div className="text-center">
            <div className="font-bold mb-2">Failed to load 3D model</div>
            <pre className="text-xs whitespace-pre-wrap">{this.state.error?.message}</pre>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

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
        <ErrorBoundary>
          <Suspense
            fallback={
              <group>
                <mesh>
                  {/* empty fallback - show a small overlay instead */}
                </mesh>
              </group>
            }
          >
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
        </ErrorBoundary>
      </Canvas>
    </motion.div>
  );
}
