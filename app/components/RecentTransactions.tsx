"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@/app/types/blockchain";
import Link from "next/link";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions/recent");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
        </div>
        <div className="p-4">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <div key={tx.hash} className="px-4 py-3">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/tx/${tx.hash}`}
                  className="text-blue-600 hover:text-blue-800 font-mono"
                >
                  {shortenHash(tx.hash)}
                </Link>
                <div className="mt-1 text-sm text-gray-600">
                  From{" "}
                  <Link
                    href={`/address/${tx.from}`}
                    className="text-blue-600 hover:text-blue-800 font-mono"
                  >
                    {shortenHash(tx.from)}
                  </Link>{" "}
                  to{" "}
                  <Link
                    href={`/address/${tx.to}`}
                    className="text-blue-600 hover:text-blue-800 font-mono"
                  >
                    {shortenHash(tx.to)}
                  </Link>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{tx.value}</div>
                <div className="text-sm text-gray-500">
                  {formatTime(tx.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
