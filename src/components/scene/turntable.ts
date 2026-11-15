import { Spring } from '@/components/scene/spring';

const RADIANS_PER_PIXEL = 0.006;
const YAW_LIMIT = 0.9;
const PITCH_LIMIT = 0.3;
const FOLLOW_YAW = 0.16;
const FOLLOW_PITCH = 0.08;
const RUBBER_BAND_STIFFNESS = 0.55;
const RELEASE_WINDOW_MILLISECONDS = 100;
const FASTEST_THROW_RADIANS_PER_SECOND = 9;

type PointerSample = { x: number; y: number; time: number };
type Grab = { pointer: PointerSample; yaw: number; pitch: number };

export class Turntable {
  readonly yaw = new Spring({ responseSeconds: 0.6, dampingRatio: 0.7 });
  readonly pitch = new Spring({ responseSeconds: 0.6, dampingRatio: 0.7 });
  private grabbed: Grab | null = null;
  private trail: PointerSample[] = [];

  grab(pointer: PointerSample) {
    this.grabbed = {
      pointer,
      yaw: this.yaw.value,
      pitch: this.pitch.value,
    };
    this.trail = [pointer];
  }

  drag(pointer: PointerSample) {
    if (!this.grabbed) return;

    const travelX = pointer.x - this.grabbed.pointer.x;
    const travelY = pointer.y - this.grabbed.pointer.y;
    this.yaw.hold(
      rubberBand(this.grabbed.yaw + travelX * RADIANS_PER_PIXEL, YAW_LIMIT),
    );
    this.pitch.hold(
      rubberBand(this.grabbed.pitch + travelY * RADIANS_PER_PIXEL, PITCH_LIMIT),
    );
    this.trail = [...this.trail, pointer].filter(
      (sample) => pointer.time - sample.time <= RELEASE_WINDOW_MILLISECONDS,
    );
  }

  release() {
    if (!this.grabbed) return;

    const [oldest] = this.trail;
    const newest = this.trail[this.trail.length - 1];
    const elapsedSeconds = (newest.time - oldest.time) / 1000;
    this.grabbed = null;
    if (elapsedSeconds === 0) return;

    this.yaw.velocity = throwVelocity((newest.x - oldest.x) / elapsedSeconds);
    this.pitch.velocity = throwVelocity((newest.y - oldest.y) / elapsedSeconds);
  }

  lookToward(horizontal: number, vertical: number) {
    this.yaw.target = horizontal * FOLLOW_YAW;
    this.pitch.target = vertical * FOLLOW_PITCH;
  }

  step(deltaSeconds: number) {
    if (this.grabbed) return;

    this.yaw.step(deltaSeconds);
    this.pitch.step(deltaSeconds);
  }
}

function rubberBand(angle: number, limit: number) {
  const overshoot = Math.abs(angle) - limit;
  if (overshoot <= 0) return angle;

  const resisted =
    (overshoot * limit * RUBBER_BAND_STIFFNESS) /
    (limit + RUBBER_BAND_STIFFNESS * overshoot);
  return Math.sign(angle) * (limit + resisted);
}

function throwVelocity(pixelsPerSecond: number) {
  const radiansPerSecond = pixelsPerSecond * RADIANS_PER_PIXEL;
  return Math.max(
    -FASTEST_THROW_RADIANS_PER_SECOND,
    Math.min(FASTEST_THROW_RADIANS_PER_SECOND, radiansPerSecond),
  );
}
