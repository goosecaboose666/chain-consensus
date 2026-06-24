import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AuditResultsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center p-6 lg:p-24 space-y-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Report</h1>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>
        <Badge variant="outline" className="text-lg py-1 px-4">
          Status: Completed
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-bold text-green-500">95</CardTitle>
            <CardDescription className="uppercase tracking-widest text-xs">Safety Score</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center text-muted-foreground">
            Consensus reached by 3/3 models.
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              The contract at this address has been audited by three independent AI models. 
              The unanimous consensus indicates a high security profile with no critical vulnerabilities detected. 
              Minor gas optimizations and architectural best practices are suggested.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
          <CardDescription>Vulnerabilities flagged by consensus</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">Info</Badge>
                  <span>Gas Optimization: Use <code>external</code> instead of <code>public</code></span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                The <code>balanceOf</code> function is currently marked as <code>public</code>. 
                Changing it to <code>external</code> can save gas when called from outside the contract.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
