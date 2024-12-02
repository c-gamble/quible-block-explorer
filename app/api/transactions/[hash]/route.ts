import { NextRequest, NextResponse } from "next/server";
import { getMockData } from "@/app/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) {
  const { hash } = await params;
  const { transactions } = getMockData();

  const transaction = transactions.find((tx) => tx.hash === hash);

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
