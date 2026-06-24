import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col p-6 lg:p-24 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit History</h1>
          <p className="text-muted-foreground">Manage and view your previous contract audits.</p>
        </div>
        <Link href="/submit">
          <Button>New Audit</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>A list of contracts you have recently audited.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3">Contract Address</th>
                  <th className="px-6 py-3">Network</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 font-mono">0x1234...5678</td>
                  <td className="px-6 py-4">Ethereum</td>
                  <td className="px-6 py-4">
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Completed
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href="/audit/123">
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
