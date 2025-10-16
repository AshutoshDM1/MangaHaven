import { cn } from "@/lib/utils";

const RadialGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center [background:radial-gradient(circle,rgba(86,6,156,1)_1%,rgba(7,7,7,1)_47%)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default RadialGradient;
