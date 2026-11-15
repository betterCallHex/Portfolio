import { Download } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { aboutQuestions, profile, skillGroups } from '@/lib/profile';

export function AboutSection() {
  return (
    <section id='about' className='mx-auto max-w-6xl px-5 pt-28 sm:px-8'>
      <SectionHeading index='02' title='About' />

      <div className='mt-12 grid gap-16 lg:grid-cols-12'>
        <div className='lg:col-span-5'>
          <p className='font-serif text-3xl leading-tight text-balance sm:text-4xl'>
            I build fast, well-designed interfaces with a clean codebase, and I
            sweat <em className='text-brand-text'>every detail</em>.
          </p>
          <Button
            variant='outline'
            className='mt-8 h-10 rounded-full px-4'
            nativeButton={false}
            render={<a href={profile.resume} download />}
          >
            <Download />
            Download CV
          </Button>
        </div>

        <Accordion
          defaultValue={[aboutQuestions[0].question]}
          className='lg:col-span-7'
        >
          {aboutQuestions.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className='border-b'
            >
              <AccordionTrigger className='items-center gap-6 rounded-none py-5 text-lg hover:no-underline sm:text-xl'>
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
      </div>

      <div className='mt-24'>
        <h3 className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
          What I work with
        </h3>
        <div className='mt-6 grid grid-cols-2 gap-x-10 gap-y-10 border-t pt-8 lg:grid-cols-5'>
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h4 className='text-sm font-medium'>{group.title}</h4>
              <ul className='text-muted-foreground mt-4 flex flex-col gap-2 text-sm'>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
