import { ISectionProps } from './Section.types';
import { cn } from '@/lib/utils';

const Section = ({ className, children }: ISectionProps) => {
  return <div className={cn(className, 'w-full md:max-w-screen-2xl mx-auto px-4')}>{children}</div>;
};

export default Section;
