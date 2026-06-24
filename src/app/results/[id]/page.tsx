'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, CheckCircle2, Zap, Lock, Info, ExternalLink, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AuditResultsPage({ params }: { params: { id: string } }) {
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
                Audit ID: <span className="font-mono ml-2 text-primary">{params.id}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-background text-green-600 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Status: Completed
              </Badge>
              <Badge variant="outline" className="bg-background">
                Free Tier
              </Badge>
            </div>
          </div>

          {/* Top Grid: Score & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardDescription className="uppercase tracking-widest text-xs font-semibold">Safety Score</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pb-6">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  {/* Simple SVG Gauge */}
                  <svg className="h-full w-full rotate-[-90deg]">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-muted/20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * safetyScore) / 100}
                      strokeLinecap="round"
                      className={getScoreColor(safetyScore)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                    <span className={`text-5xl font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}</span>
                    <span className="text-xs text-muted-foreground font-medium">/ 100</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                  <div className={`h-2 w-2 rounded-full ${getScoreBg(safetyScore)}`} />
                  Excellent Security
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 py-3 flex justify-center border-t">
                <p className="text-xs text-muted-foreground flex items-center italic">
                  <Zap className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                  Consensus reached by 3/3 models
                </p>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Security Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">
                  Our multi-model audit engine has completed the analysis of your contract. 
                  <strong> GPT-4o, Claude 3.5, and Gemini 1.5</strong> have cross-reviewed the findings.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="border rounded-lg p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Critical Issues</div>
                    <div className="text-2xl font-bold text-green-600">0</div>
                  </div>
                  <div className="border rounded-lg p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">High/Med Issues</div>
                    <div className="text-2xl font-bold text-green-600">0</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  The consensus indicates a highly secure contract structure. No major exploit vectors like reentrancy or access control flaws were found by any of the models.
                </p>
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

          {/* Paid Teaser */}
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
                  <Button className="w-full">
                    Upgrade to Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
