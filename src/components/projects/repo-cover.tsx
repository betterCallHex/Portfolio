import { cn } from 'cn';
import type { ReactNode } from 'react';
import { seededRandom } from '@/lib/seeded-random';

const INK = 'oklch(0.17 0.01 90)';
const CREAM = 'oklch(0.95 0.012 90)';
const LIME = 'oklch(0.9 0.2 125)';
const ACCENTS = [
  'oklch(0.7 0.19 40)',
  'oklch(0.62 0.19 265)',
  'oklch(0.78 0.14 350)',
  'oklch(0.8 0.15 85)',
];
const WIDTH = 400;
const HEIGHT = 300;

type Random = () => number;
type Palette = { background: string; primary: string; secondary: string };

const patterns = [orbits, blocks, waves, dots];

export function RepoCover({
  name,
  label,
  className,
}: {
  name: string;
  label?: string;
  className?: string;
}) {
  const random = seededRandom(name);
  const palette = pickPalette(random);
  const pattern = patterns[Math.floor(random() * patterns.length)];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio='xMidYMid slice'
        aria-hidden
        className='absolute inset-0 size-full'
      >
        <rect width={WIDTH} height={HEIGHT} fill={palette.background} />
        {pattern(random, palette)}
      </svg>
      {label && (
        <span
          className='absolute bottom-4 left-4 rounded-full px-2.5 py-1 font-mono text-[11px] tracking-widest uppercase backdrop-blur-sm'
          style={{
            background: `color-mix(in oklch, ${palette.background} 70%, transparent)`,
            color: palette.primary,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function pickPalette(random: Random): Palette {
  const accent = ACCENTS[Math.floor(random() * ACCENTS.length)];
  const options: Palette[] = [
    { background: INK, primary: LIME, secondary: accent },
    { background: LIME, primary: INK, secondary: accent },
    { background: CREAM, primary: INK, secondary: accent },
    { background: accent, primary: INK, secondary: CREAM },
  ];
  return options[Math.floor(random() * options.length)];
}

function orbits(random: Random, palette: Palette): ReactNode {
  const centerX = 80 + random() * 240;
  const centerY = 60 + random() * 180;
  const rings = Array.from({ length: 9 }, (_, ring) => ({
    id: `ring-${ring}`,
    radius: 18 + ring * (22 + random() * 10),
    color: ring % 3 === 0 ? palette.secondary : palette.primary,
    width: 2 + random() * 5,
  }));

  return rings.map((ring) => (
    <circle
      key={ring.id}
      cx={centerX}
      cy={centerY}
      r={ring.radius}
      fill='none'
      stroke={ring.color}
      strokeWidth={ring.width}
    />
  ));
}

function blocks(random: Random, palette: Palette): ReactNode {
  const columns = 4 + Math.floor(random() * 3);
  const rows = 3;
  const cellWidth = WIDTH / columns;
  const cellHeight = HEIGHT / rows;

  return Array.from({ length: columns * rows }, (_, cell) => {
    const x = (cell % columns) * cellWidth;
    const y = Math.floor(cell / columns) * cellHeight;
    const choice = random();
    const color = random() > 0.7 ? palette.secondary : palette.primary;
    const key = `cell-${cell}`;

    if (choice < 0.3) {
      return (
        <circle
          key={key}
          cx={x + cellWidth / 2}
          cy={y + cellHeight / 2}
          r={Math.min(cellWidth, cellHeight) * 0.42}
          fill={color}
        />
      );
    }
    if (choice < 0.55) {
      const corner = Math.floor(random() * 4);
      const path = quarterCircle(x, y, cellWidth, cellHeight, corner);
      return <path key={key} d={path} fill={color} />;
    }
    if (choice < 0.7) {
      return (
        <rect
          key={key}
          x={x + 6}
          y={y + 6}
          width={cellWidth - 12}
          height={cellHeight - 12}
          fill={color}
        />
      );
    }
    return null;
  });
}

function waves(random: Random, palette: Palette): ReactNode {
  const lines = 14;
  const amplitude = 10 + random() * 26;
  const frequency = 1 + random() * 2.5;
  const phase = random() * Math.PI * 2;

  return Array.from({ length: lines }, (_, line) => {
    const baseline = (HEIGHT / lines) * line + 10;
    const points = Array.from({ length: 41 }, (_, step) => {
      const x = (WIDTH / 40) * step;
      const y =
        baseline +
        Math.sin((step / 40) * Math.PI * 2 * frequency + phase + line * 0.35) *
          amplitude;
      return `${step === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return (
      <path
        key={`wave-${line}`}
        d={points}
        fill='none'
        stroke={line % 4 === 0 ? palette.secondary : palette.primary}
        strokeWidth={3}
        strokeLinecap='round'
      />
    );
  });
}

function dots(random: Random, palette: Palette): ReactNode {
  const spacing = 26;
  const focusX = random() * WIDTH;
  const focusY = random() * HEIGHT;
  const columns = Math.ceil(WIDTH / spacing) + 1;
  const rows = Math.ceil(HEIGHT / spacing) + 1;

  return Array.from({ length: columns * rows }, (_, cell) => {
    const x = (cell % columns) * spacing;
    const y = Math.floor(cell / columns) * spacing;
    const distance = Math.hypot(x - focusX, y - focusY);
    const radius = Math.max(1.2, 11 - distance / 22);

    return (
      <circle
        key={`dot-${cell}`}
        cx={x}
        cy={y}
        r={radius}
        fill={distance < 70 ? palette.secondary : palette.primary}
      />
    );
  });
}

function quarterCircle(
  x: number,
  y: number,
  width: number,
  height: number,
  corner: number,
) {
  const radius = Math.min(width, height);
  const corners = [
    `M${x},${y} h${radius} a${radius},${radius} 0 0,1 -${radius},${radius} z`,
    `M${x + width},${y} v${radius} a${radius},${radius} 0 0,1 -${radius},-${radius} z`,
    `M${x + width},${y + height} h-${radius} a${radius},${radius} 0 0,1 ${radius},-${radius} z`,
    `M${x},${y + height} v-${radius} a${radius},${radius} 0 0,1 ${radius},${radius} z`,
  ];
  return corners[corner];
}
