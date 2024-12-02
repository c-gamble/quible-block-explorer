"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Transaction, AddressInfo } from "@/app/types/blockchain";
import Link from "next/link";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
}

export default function AddressPage() {
  const params = useParams<{ address: string }>();
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalTransactions: 0,
  });

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch(
          `/api/address/${params.address}?page=${pagination.currentPage}`
        );
        if (!response.ok) {
          throw new Error("Address not found");
        }
        const data = await response.json();
        setAddressInfo(data.addressInfo);
        setTransactions(data.transactions);
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.pagination.total / data.pagination.limit),
          totalTransactions: data.pagination.total,
        }));
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch address data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, [params.address, pagination.currentPage]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!addressInfo) {
    return <div>Address not found</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Address Details</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Address</div>
            <div className="font-mono">{params.address}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Balance</div>
            <div>{addressInfo.balance}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">
              Transactions
            </div>
            <div>{addressInfo.transactionCount}</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium">Transactions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <div key={tx.hash} className="px-4 py-3">
              <Link
                href={`/tx/${tx.hash}`}
                className="text-blue-600 hover:text-blue-800 font-mono"
              >
                {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
              </Link>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Value: </span>
                  <span>{tx.value}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status: </span>
                  <span
                    className={
                      tx.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {pagination.currentPage > 1 && (
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            {pagination.currentPage < pagination.totalPages && (
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Next
              </button>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Total transactions: {pagination.totalTransactions}
          </div>
        </div>
      </div>
    </div>
  );
}
