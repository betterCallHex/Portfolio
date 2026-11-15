import { Download } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { aboutQuestions, mainTechnologies, profile } from '@/lib/profile';

export function AboutSection() {
  return (
    <section id='about' className='mx-auto max-w-6xl px-5 pt-32 sm:px-8'>
      <SectionHeading index='02' title='About' />

      <div className='mt-12 grid gap-16 lg:grid-cols-12'>
        <Reveal className='lg:col-span-5'>
          <p className='font-serif text-3xl leading-tight text-balance sm:text-4xl'>
            I build fast, well-designed interfaces with a clean codebase, and I
            sweat <em className='text-brand'>every detail</em>.
          </p>

          <h3 className='text-muted-foreground mt-12 font-mono text-xs tracking-widest uppercase'>
            Main technologies
          </h3>
          <ul className='mt-4 divide-y border-y'>
            {mainTechnologies.map((technology) => (
              <li
                key={technology.name}
                className='flex items-center gap-3 py-3 text-sm'
              >
                <img
                  src={technology.icon}
                  alt=''
                  width={20}
                  height={20}
                  className='size-5'
                />
                {technology.name}
                <span className='text-muted-foreground ml-auto font-mono text-xs uppercase'>
                  {technology.level}
                </span>
              </li>
            ))}
          </ul>

          <Button
            variant='outline'
            className='mt-6 h-10 rounded-full px-4'
            nativeButton={false}
            render={<a href={profile.resume} download />}
          >
            <Download />
            Download CV
          </Button>
        </Reveal>

        <Reveal delay={0.1} className='lg:col-span-7'>
          <Accordion defaultValue={[aboutQuestions[0].question]}>
            {aboutQuestions.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className='border-b'
              >
                <AccordionTrigger className='items-center gap-6 rounded-none py-6 text-lg hover:no-underline sm:text-xl'>
                  <span className='flex items-baseline gap-5'>
                    <span className='text-muted-foreground font-mono text-xs'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className='font-medium tracking-tight'>
                      {item.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground pb-6 pl-10 text-base leading-relaxed'>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
