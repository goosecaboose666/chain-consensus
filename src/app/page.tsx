import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Zap, Layers, BarChart3, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl tracking-tight">ChainConsensus</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How it Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link href="/submit">
            <Button size="sm">Launch App</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-3xl">
                  Multi-Model AI Smart Contract Auditing
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Three independent AI models. One unanimous verdict.
                  Dramatically reduce false positives and catch more exploits before deployment.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/submit">
                  <Button size="lg" className="px-8">Start Free Audit</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="px-8">View History</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unanimous Consensus</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Single-model AI audits often hallucinate or miss subtle edge cases.
                  ChainConsensus uses a multi-layered approach to ensure production-grade security.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Layers className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>3 Independent Audits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your code is analyzed in parallel by GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center border-primary/50 bg-primary/5">
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Cross-Model Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Models review each other's findings to challenge hallucinations and verify logic.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <CheckCircle2 className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Consensus Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Only findings with high confidence and model agreement make it to your report.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transparent Pricing</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Start for free, upgrade for a comprehensive security breakdown.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-start gap-8 py-12 md:grid-cols-2">
              <div className="flex flex-col p-6 bg-background border rounded-lg shadow-lg justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold">Free Tier</h3>
                  <div className="mt-4 text-4xl font-bold">$0</div>
                  <p className="mt-2 text-muted-foreground italic">Instant safety score</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      <span>Safety Score (1-100)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      <span>Top 3 Critical Hazards</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      <span>Basic Exploit Vectors</span>
                    </li>
                  </ul>
                </div>
                <Link href="/submit" className="mt-8">
                  <Button className="w-full" variant="outline">Start Free Audit</Button>
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-primary text-primary-foreground border rounded-lg shadow-lg justify-between h-full relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Popular
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Full Audit</h3>
                  <div className="mt-4 text-4xl font-bold text-white">$199</div>
                  <p className="mt-2 text-primary-foreground/80 italic">Per Audit Report</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>Comprehensive Audit Report</span>
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>Full Consensus Breakdown</span>
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>Code-Level Recommendations</span>
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>Gas Optimization Analysis</span>
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>Formal Verification Hints</span>
                    </li>
                  </ul>
                </div>
                <Link href="/submit" className="mt-8">
                  <Button className="w-full bg-white text-primary hover:bg-white/90">Get Full Report</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2026 ChainConsensus. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
