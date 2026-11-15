import type { ThreeEvent } from '@react-three/fiber';
import type { Ref } from 'react';

const TAP_SLOP_PIXELS = 8;

export type Nudgeable = { nudge: () => void };

export type PokeableProps = {
  ref: Ref<Nudgeable>;
  isStill: boolean;
};

export function isTap(event: ThreeEvent<MouseEvent>) {
  return event.delta <= TAP_SLOP_PIXELS;
}

export function isMouse(event: ThreeEvent<PointerEvent>) {
  return event.pointerType === 'mouse';
}
