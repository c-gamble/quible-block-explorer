import Search from "@/app/components/Search";
import RecentTransactions from "@/app/components/RecentTransactions";

export default function Home() {
  return (
    <div className="space-y-8">
      <Search />
      <RecentTransactions />
    </div>
  );
}
