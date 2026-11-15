import { useFrame } from '@react-three/fiber';
import { useImperativeHandle, useRef, useState } from 'react';
import { type Group, type Mesh, type ShaderMaterial, Vector2 } from 'three';
import { isMouse, isTap, type PokeableProps } from '@/components/scene/poke';
import type { ScenePalette } from '@/components/scene/scene-palette';
import { Spring } from '@/components/scene/spring';

const CUP_PROFILE = [
  [0, -0.5],
  [0.36, -0.5],
  [0.44, -0.44],
  [0.6, 0.48],
  [0.58, 0.52],
  [0.55, 0.48],
  [0.41, -0.38],
  [0, -0.38],
].map(([radius, height]) => new Vector2(radius, height));
const SAUCER_PROFILE = [
  [0, -0.58],
  [0.6, -0.58],
  [0.98, -0.46],
  [0.98, -0.42],
  [0.56, -0.52],
  [0, -0.52],
].map(([radius, height]) => new Vector2(radius, height));
const NUDGE_RADIANS_PER_SECOND = 2.2;
const POKE_RADIANS_PER_SECOND = 5;
const PUFF_PHASES = [0, 0.26, 0.52, 0.78];
const PUFF_SECONDS = 4.2;
const PUFF_RISE = 1.2;
const PUFF_OPACITY = { dark: 0.34, light: 0.18 };
const PUFF_VERTEX_SHADER = `
  varying vec3 facing;
  void main() {
    facing = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const PUFF_FRAGMENT_SHADER = `
  uniform vec3 tint;
  uniform float opacity;
  varying vec3 facing;
  void main() {
    float core = pow(max(facing.z, 0.0), 2.5);
    gl_FragColor = vec4(tint, core * opacity);
  }
`;

export function CoffeeCup({
  ref,
  isStill,
  palette,
}: PokeableProps & { palette: ScenePalette }) {
  const cup = useRef<Group>(null);
  const [tilt] = useState(
    () => new Spring({ responseSeconds: 0.42, dampingRatio: 0.28 }),
  );
  const nudge = () => {
    tilt.velocity += NUDGE_RADIANS_PER_SECOND;
  };

  useImperativeHandle(ref, () => ({ nudge }));

  useFrame((_, deltaSeconds) => {
    if (cup.current) cup.current.rotation.z = tilt.step(deltaSeconds);
  });

  return (
    <group
      rotation={[0, -0.7, 0]}
      onPointerEnter={(event) => {
        if (isMouse(event) && !isStill) nudge();
      }}
      onClick={(event) => {
        if (isTap(event)) tilt.velocity += POKE_RADIANS_PER_SECOND;
      }}
    >
      <mesh>
        <latheGeometry args={[SAUCER_PROFILE, 64]} />
        <meshStandardMaterial color={palette.brand} roughness={0.35} />
      </mesh>
      <group ref={cup} position={[0, -0.5, 0]}>
        <group position={[0, 0.5, 0]}>
          <mesh>
            <latheGeometry args={[CUP_PROFILE, 64]} />
            <meshPhysicalMaterial
              color={palette.foreground}
              roughness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh position={[0.66, 0.02, 0]}>
            <torusGeometry args={[0.24, 0.065, 20, 48]} />
            <meshPhysicalMaterial
              color={palette.foreground}
              roughness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.36, 0]} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[0.555, 48]} />
            <meshStandardMaterial color={palette.coffee} roughness={0.15} />
          </mesh>
          {!isStill && <Steam palette={palette} />}
        </group>
      </group>
    </group>
  );
}

function Steam({ palette }: { palette: ScenePalette }) {
  const puffs = useRef<(Mesh<never, ShaderMaterial> | null)[]>([]);
  const density = palette.isDark ? PUFF_OPACITY.dark : PUFF_OPACITY.light;

  useFrame(({ clock }) => {
    for (const [index, puff] of puffs.current.entries()) {
      if (puff) {
        drift(
          puff,
          clock.elapsedTime / PUFF_SECONDS + PUFF_PHASES[index],
          density,
        );
      }
    }
  });

  return PUFF_PHASES.map((phase, index) => (
    <mesh
      key={phase}
      ref={(puff: Mesh<never, ShaderMaterial> | null) => {
        puffs.current[index] = puff;
      }}
    >
      <sphereGeometry args={[0.16, 24, 24]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          tint: { value: palette.foreground },
          opacity: { value: 0 },
        }}
        vertexShader={PUFF_VERTEX_SHADER}
        fragmentShader={PUFF_FRAGMENT_SHADER}
      />
    </mesh>
  ));
}

function drift(
  puff: Mesh<never, ShaderMaterial>,
  cycles: number,
  density: number,
) {
  const life = cycles % 1;
  puff.position.set(
    Math.sin(cycles * 5) * 0.1,
    0.42 + life * PUFF_RISE,
    Math.cos(cycles * 3) * 0.07,
  );
  puff.scale.set(0.7 + life * 0.9, 0.9 + life * 1.4, 0.7 + life * 0.9);
  puff.material.uniforms.opacity.value = Math.sin(life * Math.PI) * density;
}
