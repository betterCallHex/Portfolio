import { marqueeTechnologies } from '@/lib/profile';

export function TechMarquee() {
  return (
    <section
      aria-label='Technologies I work with'
      className='overflow-hidden border-y [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] py-6'
    >
      <div className='animate-marquee flex w-max hover:[animation-play-state:paused]'>
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className='flex shrink-0 items-center'>
      {marqueeTechnologies.map((technology) => (
        <li
          key={technology.name}
          className='text-muted-foreground flex items-center gap-3 px-10 font-mono text-sm tracking-widest uppercase'
        >
          <img
            src={technology.icon}
            alt=''
            width={22}
            height={22}
            className='size-5.5 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0'
          />
          {technology.name}
          <span className='text-border pl-10'>✦</span>
        </li>
      ))}
    </ul>
  );
}
