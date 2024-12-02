import { NextRequest, NextResponse } from "next/server";
import { getMockData } from "@/app/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = await params;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const { transactions, addresses } = getMockData();
  const addressInfo = addresses[address];

  if (!addressInfo) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const addressTransactions = transactions
    .filter((tx) => tx.from === address || tx.to === address)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    addressInfo,
    transactions: addressTransactions,
    pagination: {
      page,
      limit,
      total: transactions.filter(
        (tx) => tx.from === address || tx.to === address
      ).length,
    },
  });
}
