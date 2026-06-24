'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Plus, Search, ExternalLink, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  // Mock data for the history
  const audits = [
    {
      id: "aud_7291a82",
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      name: "WETH9",
      network: "Ethereum",
      status: "Completed",
      score: 98,
      date: "2026-06-24",
    },
    {
      id: "aud_9210b11",
      address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      name: "Matic Token",
      network: "Ethereum",
      status: "Completed",
      score: 92,
      date: "2026-06-23",
    },
    {
      id: "aud_1102c88",
      address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      name: "Uniswap",
      network: "Ethereum",
      status: "In Progress",
      score: null,
      date: "2026-06-24",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl tracking-tight">ChainConsensus</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
           <Link href="/submit">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Audit
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Audit History</h1>
              <p className="text-muted-foreground mt-1">Manage and view your previously analyzed smart contracts.</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Total Audits</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Avg Safety Score</CardDescription>
                <CardTitle className="text-2xl text-green-600">89.4</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Secured Contracts</CardDescription>
                <CardTitle className="text-2xl">8</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Audit List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>A complete history of your multi-model audits.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  placeholder="Search address..." 
                  className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Contract</th>
                      <th className="px-6 py-4">Network</th>
                      <th className="px-6 py-4 text-center">Safety Score</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-background">
                    {audits.map((audit) => (
                      <tr key={audit.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{audit.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold">{audit.name}</span>
                            <span className="text-xs text-muted-foreground font-mono truncate w-32">
                              {audit.address.substring(0, 6)}...{audit.address.substring(38)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{audit.network}</td>
                        <td className="px-6 py-4 text-center">
                          {audit.score ? (
                            <span className={`font-bold ${audit.score >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {audit.score}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant={audit.status === 'Completed' ? 'default' : 'outline'}
                            className={audit.status === 'Completed' ? 'bg-green-100 text-green-800 border-none' : 'animate-pulse'}
                          >
                            {audit.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/results/${audit.id}`}>
                            <Button variant="ghost" size="sm" className="group">
                              View Report
                              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 border-t bg-background mt-auto">
        <div className="container mx-auto px-6 text-center md:text-left">
          <p className="text-xs text-muted-foreground">© 2026 ChainConsensus Platform.</p>
        </div>
      </footer>
    </div>
  );
}
