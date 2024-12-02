"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Transaction } from "@/app/types/blockchain";
import Link from "next/link";

export default function TransactionPage() {
  const params = useParams<{ hash: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transactions/${params.hash}`);
        if (!response.ok) {
          throw new Error("Transaction not found");
        }
        const data = await response.json();
        setTransaction(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch transaction"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [params.hash]);

  if (loading) {
    return <div>Loading transaction details...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transaction Details</h2>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Transaction Hash
            </h3>
            <p className="mt-1 font-mono">{transaction.hash}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">From</h3>
              <Link
                href={`/address/${transaction.from}`}
                className="mt-1 text-blue-600 hover:text-blue-800 font-mono"
              >
                {transaction.from}
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">To</h3>
              <Link
                href={`/address/${transaction.to}`}
                className="mt-1 text-blue-600 hover:text-blue-800 font-mono"
              >
                {transaction.to}
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Value</h3>
              <p className="mt-1">{transaction.value}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p
                className={`mt-1 ${
                  transaction.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.status}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gas Price</h3>
              <p className="mt-1">{transaction.gasPrice}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gas Used</h3>
              <p className="mt-1">{transaction.gasUsed}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Block Number
              </h3>
              <p className="mt-1">{transaction.blockNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
              <p className="mt-1">
                {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
