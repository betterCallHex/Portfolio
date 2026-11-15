import { useFrame } from '@react-three/fiber';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  CanvasTexture,
  type Color,
  type Group,
  MeshStandardMaterial,
  SRGBColorSpace,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { isMouse, isTap, type PokeableProps } from '@/components/scene/poke';
import type { ScenePalette } from '@/components/scene/scene-palette';
import { Spring } from '@/components/scene/spring';

const SIZE = 1.5;
const CORNER_RADIUS = 0.16;
const REST_YAW = 0.5;
const FULL_TURN = Math.PI * 2;
const NUDGE_RADIANS_PER_SECOND = 5;
const FRONT_FACE = 4;
const FACE_COUNT = 6;
const LABEL_PIXELS = 512;
const LABEL_FONT = '700 230px "Geist Variable", system-ui, sans-serif';
const INK = '#161614';

const geometry = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 6, CORNER_RADIUS);

export function JavaScriptBlock({
  ref,
  isStill,
  palette,
}: PokeableProps & { palette: ScenePalette }) {
  const block = useRef<Group>(null);
  const [turn] = useState(
    () => new Spring({ responseSeconds: 0.8, dampingRatio: 0.6 }),
  );
  const materials = useFaceMaterials(palette.javascript);
  const nudge = () => {
    turn.velocity += NUDGE_RADIANS_PER_SECOND;
  };

  useImperativeHandle(ref, () => ({ nudge }));

  useFrame((_, deltaSeconds) => {
    if (block.current) {
      block.current.rotation.y = REST_YAW + turn.step(deltaSeconds);
    }
  });

  return (
    <group
      ref={block}
      rotation={[0.16, REST_YAW, -0.08]}
      onPointerEnter={(event) => {
        if (isMouse(event) && !isStill) nudge();
      }}
      onClick={(event) => {
        if (isTap(event)) turn.target += FULL_TURN;
      }}
    >
      <mesh geometry={geometry} material={materials} />
    </group>
  );
}

function useFaceMaterials(yellow: Color) {
  const [materials] = useState(() => {
    const label = new CanvasTexture(document.createElement('canvas'));
    label.colorSpace = SRGBColorSpace;
    label.anisotropy = 8;

    return Array.from(
      { length: FACE_COUNT },
      (_, face) =>
        new MeshStandardMaterial({
          roughness: 0.42,
          map: face === FRONT_FACE ? label : null,
        }),
    );
  });

  useEffect(() => {
    const label = materials[FRONT_FACE].map as CanvasTexture;
    const paint = () => {
      paintLabel(label.image, `#${yellow.getHexString()}`);
      label.needsUpdate = true;
    };

    for (const [face, material] of materials.entries()) {
      material.color.set(face === FRONT_FACE ? '#ffffff' : yellow);
    }
    paint();
    document.fonts.load(LABEL_FONT).then(paint);
  }, [materials, yellow]);

  return materials;
}

function paintLabel(canvas: HTMLCanvasElement, background: string) {
  canvas.width = LABEL_PIXELS;
  canvas.height = LABEL_PIXELS;
  const context = canvas.getContext('2d');
  if (!context) return;

  context.fillStyle = background;
  context.fillRect(0, 0, LABEL_PIXELS, LABEL_PIXELS);
  context.fillStyle = INK;
  context.font = LABEL_FONT;
  context.textAlign = 'right';
  context.textBaseline = 'alphabetic';
  context.fillText('JS', LABEL_PIXELS - 52, LABEL_PIXELS - 64);
}
