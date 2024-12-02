export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  timestamp: number;
  status: "success" | "failed";
  blockNumber: number;
}

export interface AddressInfo {
  address: string;
  balance: string;
  transactionCount: number;
}
