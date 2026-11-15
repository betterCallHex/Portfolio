import { useFrame } from '@react-three/fiber';
import { useImperativeHandle, useRef, useState } from 'react';
import type { Group } from 'three';
import { isMouse, isTap, type PokeableProps } from '@/components/scene/poke';
import type { ScenePalette } from '@/components/scene/scene-palette';
import { Spring } from '@/components/scene/spring';

const ORBIT_RADIUS = 0.92;
const ORBIT_TILTS = [0, Math.PI / 3, -Math.PI / 3];
const CRUISE_RADIANS_PER_SECOND = 0.9;
const NUDGE_RADIANS_PER_SECOND = 5;
const POKE_RADIANS_PER_SECOND = 14;
const BOOST_DECAY_PER_SECOND = 1.6;
const POKE_SWELL_PER_SECOND = 2.4;
const DRIFT_RADIANS_PER_SECOND = 0.12;

export function ReactAtom({
  ref,
  isStill,
  palette,
}: PokeableProps & { palette: ScenePalette }) {
  const atom = useRef<Group>(null);
  const electrons = useRef<(Group | null)[]>([]);
  const motion = useRef({ boost: 0, angle: 0 });
  const [swell] = useState(
    () => new Spring({ rest: 1, responseSeconds: 0.45, dampingRatio: 0.45 }),
  );
  const nudge = () => {
    motion.current.boost += NUDGE_RADIANS_PER_SECOND;
  };

  useImperativeHandle(ref, () => ({ nudge }));

  useFrame((_, deltaSeconds) => {
    if (!atom.current) return;

    const cruise = isStill ? 0 : CRUISE_RADIANS_PER_SECOND;
    motion.current.boost *= Math.exp(-BOOST_DECAY_PER_SECOND * deltaSeconds);
    motion.current.angle += (cruise + motion.current.boost) * deltaSeconds;
    for (const [orbit, electron] of electrons.current.entries()) {
      if (electron) electron.rotation.z = motion.current.angle + orbit * 2.1;
    }
    atom.current.rotation.y += isStill
      ? 0
      : DRIFT_RADIANS_PER_SECOND * deltaSeconds;
    atom.current.scale.setScalar(swell.step(deltaSeconds));
  });

  return (
    <group
      ref={atom}
      rotation={[0.35, 0.4, 0.1]}
      onPointerEnter={(event) => {
        if (isMouse(event) && !isStill) nudge();
      }}
      onClick={(event) => {
        if (!isTap(event)) return;
        motion.current.boost += POKE_RADIANS_PER_SECOND;
        swell.velocity += POKE_SWELL_PER_SECOND;
      }}
    >
      <mesh>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshStandardMaterial color={palette.brand} roughness={0.3} />
      </mesh>
      {ORBIT_TILTS.map((tilt, orbit) => (
        <group key={tilt} rotation={[Math.PI / 2.4, tilt, 0]}>
          <mesh>
            <torusGeometry args={[ORBIT_RADIUS, 0.035, 20, 120]} />
            <meshStandardMaterial color={palette.foreground} roughness={0.4} />
          </mesh>
          <group
            ref={(electron) => {
              electrons.current[orbit] = electron;
            }}
          >
            <mesh position={[ORBIT_RADIUS, 0, 0]}>
              <sphereGeometry args={[0.085, 24, 24]} />
              <meshStandardMaterial color={palette.brand} roughness={0.3} />
            </mesh>
          </group>
        </group>
      ))}
      <mesh visible={false}>
        <sphereGeometry args={[ORBIT_RADIUS, 12, 12]} />
      </mesh>
    </group>
  );
}
