import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

const ShinyText = () => {
  return (
    <div
      className={cn(
        "w-fit group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-zinc-900 hover:bg-zinc-800 z-10 mb-40"
      )}
    >
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 text-neutral-400 hover:text-neutral-300">
        <span>✨ Introducing MangaHaven</span>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedShinyText>
    </div>
  );
};

export default ShinyText;
