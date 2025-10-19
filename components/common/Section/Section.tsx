import { ISectionProps } from './Section.types';
import { cn } from '@/lib/utils';

const Section = ({ className, children }: ISectionProps) => {
  return (
    <div className={cn(className, 'w-full md:max-w-7xl mx-auto border-x border-edge ')}>{children}</div>
  );
};

export default Section;
