'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, CheckCircle2, Zap, Lock, Info, ExternalLink, BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { use } from "react";

export default function AuditResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Simulate unlocking if payment=success is in URL
    if (searchParams.get("payment") === "success") {
      setIsUnlocked(true);
    }
  }, [searchParams]);

  const handleUpgrade = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: resolvedParams.id })
      });

      const data = await response.json();

      if (data.success && data.invoice?.invoice_url) {
        window.location.href = data.invoice.invoice_url;
      } else {
        alert("Failed to create invoice: " + (data.error || "Unknown error"));
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during checkout.");
      setIsCheckingOut(false);
    }
  };

  // In a real app, this would be fetched from an API
  const safetyScore = 95;
  const consensusRate = 100; // 3/3 models

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl tracking-tight">ChainConsensus</span>
        </Link>
        <div className="ml-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Status Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Audit Report</h1>
              <p className="text-muted-foreground flex items-center mt-1">
                Audit ID: <span className="font-mono ml-2 text-primary">{resolvedParams.id}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm py-1.5 px-4 bg-background">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                Audit Completed
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-4">
                Mainnet
              </Badge>
            </div>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Safety Score */}
            <Card className="md:col-span-1 border-primary/20 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${getScoreBg(safetyScore)}`}></div>
              <CardHeader className="pb-2">
                <CardDescription className="uppercase tracking-widest text-xs font-semibold">Safety Score</CardDescription>
                <div className="flex items-baseline mt-2">
                  <span className={`text-6xl font-black tracking-tighter ${getScoreColor(safetyScore)}`}>{safetyScore}</span>
                  <span className="text-xl text-muted-foreground font-medium ml-1">/100</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <Zap className="h-4 w-4 mr-1.5 text-yellow-500" />
                  Minor optimizations suggested
                </div>
              </CardContent>
            </Card>

            {/* AI Consensus */}
            <Card className="md:col-span-2 border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <ShieldCheck className="h-32 w-32" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="uppercase tracking-widest text-xs font-semibold">Consensus Verdict</CardDescription>
                <CardTitle className="text-2xl mt-1">High Security Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  The smart contract was independently analyzed by our ensemble of three specialized AI models.
                  All models reached unanimous consensus (<span className="font-semibold text-foreground">3/3</span>) that no critical vulnerabilities exist in the core logic.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">Reentrancy: Safe</Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">Access Control: Safe</Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">Overflow: Safe</Badge>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">Gas: Opt Required</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Findings */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Consensus Findings
            </h2>
            <Card>
              <CardContent className="p-0">
                <Accordion className="w-full">
                  <AccordionItem value="item-1" className="border-b-0 px-6">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>
                        <span className="font-medium">Gas Optimization: Use <code>external</code> visibility</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                      All 3 models identified that several functions (including <code>balanceOf</code> and <code>totalSupply</code>) are marked as <code>public</code> but are never called internally.
                      Changing these to <code>external</code> will reduce gas costs for callers by avoiding unnecessary copying of arguments to memory.
                    </AccordionContent>
                  </AccordionItem>
                  <div className="h-px bg-muted mx-6" />
                  <AccordionItem value="item-2" className="border-b-0 px-6">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>
                        <span className="font-medium">Floating Pragma used</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                      The contract uses <code>pragma solidity ^0.8.20;</code>. While safe, best practice for deployed contracts is to lock the pragma to a specific version (e.g., <code>0.8.20</code>) to ensure the contract is tested with the exact compiler version used for deployment.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Paid Teaser or Unlocked Report */}
          {isUnlocked ? (
            <Card className="border-green-500/50 bg-green-500/5 shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-500/20" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-400">Comprehensive Report Unlocked</CardTitle>
                <CardDescription>Thank you for your purchase. You now have full access to all findings and remediation steps.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded border">
                    <h4 className="font-semibold mb-2">Remediation for Reentrancy</h4>
                    <p className="text-sm text-muted-foreground">Implement the Checks-Effects-Interactions pattern. Move state changes before external calls, or use OpenZeppelin's ReentrancyGuard.</p>
                  </div>
                  <div className="p-4 bg-background rounded border">
                    <h4 className="font-semibold mb-2">Formal Verification Hints</h4>
                    <p className="text-sm text-muted-foreground">Invariant: <code>totalSupply == sum(balances)</code>. The current implementation could violate this during minting under certain conditions.</p>
                  </div>
                  <div className="p-4 bg-background rounded border">
                    <h4 className="font-semibold mb-2">Consensus Discrepancy Analysis</h4>
                    <p className="text-sm text-muted-foreground">Model 1 flagged an integer overflow, but Models 2 and 3 correctly identified the compiler version (0.8.20) which has built-in overflow protection. Model 1's finding was discarded.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/50 bg-primary/5 shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <Lock className="h-12 w-12 text-primary/10" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Unlock Comprehensive Report</CardTitle>
                <CardDescription>Get the full breakdown including code-level remediation and model-by-model discrepancy analysis.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      Detailed remediation steps for every finding
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      Formal verification hints & logical invariants
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      Full consensus discrepancy breakdown
                    </li>
                  </ul>
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
                    <div className="text-3xl font-bold">$199</div>
                    <div className="text-xs text-muted-foreground mb-4">ONE-TIME FEE PER AUDIT</div>
                    <Button
                      className="w-full"
                      onClick={handleUpgrade}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Invoice...
                        </>
                      ) : (
                        "Upgrade to Full Report"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 ChainConsensus. Audit reports are AI-generated.</p>
          <div className="flex gap-4">
             <Link href="#" className="text-xs text-muted-foreground hover:underline">Terms</Link>
             <Link href="#" className="text-xs text-muted-foreground hover:underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
