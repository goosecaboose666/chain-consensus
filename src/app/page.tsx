import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xl mb-6">
        ChainConsensus
      </h1>
      <p className="text-xl text-muted-foreground max-w-[42rem] leading-normal mb-10">
        The first multi-model AI smart contract auditing platform. 
        Three independent models. One unanimous verdict. 
        Dramatically reduce false positives and catch more exploits.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/submit">
          <Button size="lg" className="h-12 px-8">
            Start Free Audit
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="h-12 px-8">
            View History
          </Button>
        </Link>
      </div>
    </main>
  );
}
