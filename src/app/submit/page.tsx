'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
    <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Contract</CardTitle>
          <CardDescription>
            Enter a smart contract address to begin the multi-model AI audit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Contract Address</Label>
            <Input 
              id="address" 
              placeholder="0x..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <select 
              id="network" 
              className="w-full p-2 border rounded-md bg-background"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              disabled={isLoading}
            >
              <option value="mainnet">Ethereum Mainnet</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-12" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Run Multi-Model Audit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
