import { Suspense } from "react";
import Home from "@/modules/Home/Home";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function HomePage() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
