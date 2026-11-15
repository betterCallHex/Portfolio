const LONGEST_STABLE_STEP_SECONDS = 1 / 30;

export class Spring {
  value: number;
  target: number;
  velocity = 0;
  private readonly stiffness: number;
  private readonly friction: number;

  constructor({
    rest = 0,
    responseSeconds = 0.4,
    dampingRatio = 1,
  }: {
    rest?: number;
    responseSeconds?: number;
    dampingRatio?: number;
  } = {}) {
    const angularFrequency = (2 * Math.PI) / responseSeconds;
    this.value = rest;
    this.target = rest;
    this.stiffness = angularFrequency ** 2;
    this.friction = 2 * dampingRatio * angularFrequency;
  }

  step(deltaSeconds: number) {
    const step = Math.min(deltaSeconds, LONGEST_STABLE_STEP_SECONDS);
    const acceleration =
      -this.stiffness * (this.value - this.target) -
      this.friction * this.velocity;
    this.velocity += acceleration * step;
    this.value += this.velocity * step;
    return this.value;
  }

  hold(value: number) {
    this.value = value;
    this.velocity = 0;
  }
}
