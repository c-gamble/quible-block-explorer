import { NextRequest, NextResponse } from "next/server";
import { getMockData } from "@/app/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  const { transactions } = getMockData();

  const matchingTransactions = transactions
    .filter(
      (tx) =>
        tx.hash.toLowerCase().includes(query) ||
        tx.from.toLowerCase().includes(query) ||
        tx.to.toLowerCase().includes(query)
    )
    .slice(0, 10);

  return NextResponse.json({ results: matchingTransactions });
}
