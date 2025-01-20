import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AddUserDialog } from "./add-user";

const RecentUsers = () => {
    return (<div className=" py-6">
        <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-800 mb-4">Recent Added</h1>
                <AddUserDialog />
            </div>
            <Table className="min-w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead >Username</TableHead>
                        <TableHead>Bounty Description</TableHead>
                        <TableHead>Guild</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.username}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.guild}</TableCell>
                            <TableCell className="text-right">{item.amount}</TableCell>
                            <TableCell className="text-right">{item.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
                <Button
                    variant="outline"
                    className="rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none"
                    aria-label="View more users"
                >
                    View More
                </Button>
            </div>
        </section>
    </div>);
}

export default RecentUsers;


const data = [
    {
        username: "@User1",
        description: "Create Content on Alchemist",
        guild: "Content",
        amount: "$50",
        date: "03/12/2025",
    },
    {
        username: "@User2",
        description: "Fix bugs in API integration",
        guild: "Development",
        amount: "$200",
        date: "03/10/2025",
    },
    {
        username: "@User3",
        description: "Design UI for Dashboard",
        guild: "Design",
        amount: "$150",
        date: "03/08/2025",
    },
    {
        username: "@User4",
        description: "Write Documentation for API",
        guild: "Documentation",
        amount: "$75",
        date: "03/05/2025",
    },
    {
        username: "@User5",
        description: "Conduct SEO audit",
        guild: "Marketing",
        amount: "$120",
        date: "03/01/2025",
    },
];