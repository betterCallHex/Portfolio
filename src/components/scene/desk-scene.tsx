import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useInView } from 'motion/react';
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type Group, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CoffeeCup } from '@/components/scene/coffee-cup';
import { Floating } from '@/components/scene/floating';
import { JavaScriptBlock } from '@/components/scene/javascript-block';
import type { Nudgeable } from '@/components/scene/poke';
import { ReactAtom } from '@/components/scene/react-atom';
import {
  type ScenePalette,
  useScenePalette,
} from '@/components/scene/scene-palette';
import { Turntable } from '@/components/scene/turntable';

const REST_PITCH = 0.12;
const DESCRIPTION =
  'A 3D still life of a JavaScript block, a React atom and a cup of coffee. Drag to turn it.';

export type DeskSubject = 'javascript' | 'react' | 'coffee';
export type DeskSceneHandle = { nudge: (subject: DeskSubject) => void };

export default function DeskScene({
  ref,
  isStill,
  onReady,
}: {
  ref: Ref<DeskSceneHandle>;
  isStill: boolean;
  onReady: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const isOnScreen = useInView(stage);
  const palette = useScenePalette();
  const [turntable] = useState(() => new Turntable());
  const javascript = useRef<Nudgeable>(null);
  const react = useRef<Nudgeable>(null);
  const coffee = useRef<Nudgeable>(null);

  useImperativeHandle(ref, () => ({
    nudge: (subject) =>
      ({ javascript, react, coffee })[subject].current?.nudge(),
  }));
  usePointerFollow(turntable, isStill);

  return (
    <div
      ref={stage}
      role='img'
      aria-label={DESCRIPTION}
      onPointerDown={(event) => startTurning(event, turntable)}
      className='size-full cursor-grab touch-pan-y select-none active:cursor-grabbing'
    >
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 32, position: [0, 1.5, 10.8] }}
        frameloop={isOnScreen ? 'always' : 'never'}
        onCreated={onReady}
      >
        <StudioLight palette={palette} />
        <TurntableRig turntable={turntable}>
          <Floating
            position={[-1.3, 0.5, -0.5]}
            phase={0}
            isStill={isStill}
            shadowRadius={1.5}
            shadowOpacity={palette.isDark ? 0.5 : 0.2}
          >
            <JavaScriptBlock
              ref={javascript}
              isStill={isStill}
              palette={palette}
            />
          </Floating>
          <Floating
            position={[1.35, 1.2, 0]}
            phase={2.1}
            isStill={isStill}
            shadowRadius={1.3}
            shadowOpacity={palette.isDark ? 0.5 : 0.2}
          >
            <ReactAtom ref={react} isStill={isStill} palette={palette} />
          </Floating>
          <Floating
            position={[0.55, -1.05, 1.1]}
            phase={4.2}
            isStill={isStill}
            shadowRadius={1.35}
            shadowOpacity={palette.isDark ? 0.5 : 0.2}
          >
            <CoffeeCup ref={coffee} isStill={isStill} palette={palette} />
          </Floating>
        </TurntableRig>
      </Canvas>
    </div>
  );
}

function usePointerFollow(turntable: Turntable, isStill: boolean) {
  useEffect(() => {
    if (isStill) return;

    const follow = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      turntable.lookToward(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      );
    };
    window.addEventListener('pointermove', follow, { passive: true });
    return () => window.removeEventListener('pointermove', follow);
  }, [turntable, isStill]);
}

function startTurning(
  event: ReactPointerEvent<HTMLDivElement>,
  turntable: Turntable,
) {
  const sample = (pointer: { clientX: number; clientY: number }) => ({
    x: pointer.clientX,
    y: pointer.clientY,
    time: performance.now(),
  });
  const turn = (move: PointerEvent) => turntable.drag(sample(move));
  const stopTurning = () => {
    turntable.release();
    window.removeEventListener('pointermove', turn);
    window.removeEventListener('pointerup', stopTurning);
    window.removeEventListener('pointercancel', stopTurning);
  };

  turntable.grab(sample(event));
  window.addEventListener('pointermove', turn);
  window.addEventListener('pointerup', stopTurning);
  window.addEventListener('pointercancel', stopTurning);
}

function StudioLight({ palette }: { palette: ScenePalette }) {
  const renderer = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const generator = new PMREMGenerator(renderer);
    const room = generator.fromScene(new RoomEnvironment()).texture;
    scene.environment = room;
    scene.environmentIntensity = 0.45;

    return () => {
      scene.environment = null;
      room.dispose();
      generator.dispose();
    };
  }, [renderer, scene]);

  return (
    <>
      <ambientLight intensity={palette.isDark ? 0.35 : 0.7} />
      <directionalLight position={[-4, 6, 6]} intensity={1.6} />
      <pointLight
        position={[4, 0.5, -2.5]}
        color={palette.brand}
        intensity={40}
      />
    </>
  );
}

function TurntableRig({
  turntable,
  children,
}: {
  turntable: Turntable;
  children: ReactNode;
}) {
  const rig = useRef<Group>(null);

  useFrame((_, deltaSeconds) => {
    if (!rig.current) return;

    turntable.step(deltaSeconds);
    rig.current.rotation.set(
      REST_PITCH + turntable.pitch.value,
      turntable.yaw.value,
      0,
    );
  });

  return <group ref={rig}>{children}</group>;
}
