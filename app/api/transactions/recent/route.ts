import { NextResponse } from "next/server";
import { getMockData } from "@/app/lib/data";

export async function GET() {
  const { transactions } = getMockData();
  // Sort by timestamp descending to get most recent first
  const recentTransactions = [...transactions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  return NextResponse.json(recentTransactions);
}
