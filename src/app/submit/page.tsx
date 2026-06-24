import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitPage() {
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
            <Input id="address" placeholder="0x..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <select id="network" className="w-full p-2 border rounded-md bg-background">
              <option value="mainnet">Ethereum Mainnet</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full h-12">Run Multi-Model Audit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
