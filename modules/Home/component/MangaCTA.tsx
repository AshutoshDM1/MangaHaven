import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function MangaCTA() {
  return (
    <>
      <div className="hidden md:flex h-[14rem] md:h-[40rem] items-center justify-center">
        <TextHoverEffect text="Manga" />
      </div>
    </>
  );
}

export default MangaCTA;
