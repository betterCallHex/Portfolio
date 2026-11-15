import { useFrame } from '@react-three/fiber';
import { type ReactNode, useRef } from 'react';
import type { Group } from 'three';

const BOB_RADIANS_PER_SECOND = 0.63;
const BOB_HEIGHT = 0.07;
const GROUND_LEVEL = -1.75;
const SHADOW_REACH = 3.2;

const SHADOW_VERTEX_SHADER = `
  varying vec2 surface;
  void main() {
    surface = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SHADOW_FRAGMENT_SHADER = `
  uniform float opacity;
  varying vec2 surface;
  void main() {
    float distanceFromCenter = distance(surface, vec2(0.5)) * 2.0;
    float softness = smoothstep(1.0, 0.0, distanceFromCenter);
    gl_FragColor = vec4(0.0, 0.0, 0.0, softness * softness * opacity);
  }
`;

export function Floating({
  position,
  phase,
  isStill,
  shadowRadius,
  shadowOpacity,
  children,
}: {
  position: [x: number, y: number, z: number];
  phase: number;
  isStill: boolean;
  shadowRadius: number;
  shadowOpacity: number;
  children: ReactNode;
}) {
  const body = useRef<Group>(null);
  const [x, y, z] = position;
  const heightFade = 1 - (y - GROUND_LEVEL) / SHADOW_REACH;

  useFrame(({ clock }) => {
    if (!body.current || isStill) return;

    body.current.position.y =
      y +
      Math.sin(clock.elapsedTime * BOB_RADIANS_PER_SECOND + phase) * BOB_HEIGHT;
  });

  return (
    <>
      <group ref={body} position={position}>
        {children}
      </group>
      <mesh
        position={[x, GROUND_LEVEL, z]}
        rotation-x={-Math.PI / 2}
        scale={shadowRadius}
      >
        <circleGeometry args={[1, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{ opacity: { value: shadowOpacity * heightFade } }}
          vertexShader={SHADOW_VERTEX_SHADER}
          fragmentShader={SHADOW_FRAGMENT_SHADER}
        />
      </mesh>
    </>
  );
}
