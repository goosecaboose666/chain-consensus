'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubmitPage() {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("mainnet");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!address || !address.startsWith('0x')) {
      alert("Please enter a valid contract address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, network }),
      });

      const data = await response.json();
      if (data.id) {
        router.push(`/results/${data.id}`);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit audit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl tracking-tight">ChainConsensus</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Start New Audit</CardTitle>
              <CardDescription>
                Analyze any verified contract with our 3-model AI consensus engine.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="address">Contract Address</Label>
                <Input 
                  id="address" 
                  placeholder="0x..." 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isLoading}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="network">Network</Label>
                <select 
                  id="network" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="mainnet">Ethereum Mainnet</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                  <option value="optimism">Optimism</option>
                  <option value="base">Base</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                className="w-full h-12 text-base font-semibold" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Source Code...
                  </>
                ) : (
                  "Run Multi-Model Audit"
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <p className="text-center text-xs text-muted-foreground">
            Audits take ~30 seconds to complete. 
            Free tier includes safety score and top 3 hazards.
          </p>
        </div>
      </main>

      <footer className="py-6 border-t bg-background mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">© 2026 ChainConsensus. Powered by Multi-Model AI.</p>
        </div>
      </footer>
    </div>
  );
}
