import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RecentUsers from "@/components/users/recent-users";

export default function Home() {

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <section className="flex flex-col gap-4 bg-green-100 p-6 rounded-lg shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Overview</h1>
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-gray-600">January 1 - January 11</p>
          <Button
            variant="outline"
            className="rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none"
            aria-label="View more details"
          >
            View More
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-400">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-700">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <RecentUsers />
    </div>
  );
}


const cards = [
  { title: "Total Value Earned", value: "$25,000" },
  { title: "Total Bounties Won", value: "$25,000" },
  { title: "Total Users Recorded", value: "1000" },
  // { title: "Total Value Earned", value: "$25,000" },
];

