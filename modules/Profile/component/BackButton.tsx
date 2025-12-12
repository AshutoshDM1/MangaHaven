import Link from 'next/link';
import { ArrowBigLeftDash } from 'lucide-react';

export const BackButton = () => {
  return (
    <Link href="/dashboard">
      <button
        type="button"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowBigLeftDash />
        Back
      </button>
    </Link>
  );
};
