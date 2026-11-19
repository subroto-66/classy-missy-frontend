import { useEffect, useState } from "react";
import { FiCheckCircle, FiCreditCard } from "react-icons/fi";
import { Link } from "react-router";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardSectionCard from "./DashboardSectionCard";
import Button from "../../../components/ui/Button";
import api from "../../../lib/axios";

export default function TransactionHistory() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/dashboard/transactions")
      .then((res) => {
        if (active && Array.isArray(res.data?.data)) {
          setTransactionsList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load transactions:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardSectionCard
      title="Transaction history"
      description="A clear record of your order payments."
    >
      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex animate-pulse items-center justify-between py-3 border-b border-neutral-100">
              <div className="h-4 w-28 rounded bg-neutral-100" />
              <div className="h-4 w-20 rounded bg-neutral-100" />
              <div className="h-4 w-32 rounded bg-neutral-100" />
              <div className="h-4 w-16 rounded bg-neutral-100" />
              <div className="h-5 w-16 rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      ) : transactionsList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                <th className="px-3 py-3 font-medium">Transaction</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Payment method</th>
                <th className="px-3 py-3 font-medium">Amount</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionsList.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-colors"
                >
                  <td className="px-3 py-4 text-[11px] font-semibold text-neutral-800">
                    {transaction.id}
                  </td>
                  <td className="px-3 py-4 text-[11px] text-neutral-600">
                    {transaction.date}
                  </td>
                  <td className="px-3 py-4 text-[11px] text-neutral-600">
                    {transaction.method}
                  </td>
                  <td className="px-3 py-4 text-[11px] font-medium text-neutral-800">
                    {formatProductPrice(transaction.amount)}
                  </td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700">
                      <FiCheckCircle size={11} />
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
            <FiCreditCard size={24} />
          </span>
          <h3 className="mt-4 text-sm font-semibold text-neutral-900">
            No transactions found
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
            Payment records and transaction receipts for your completed orders will be listed here.
          </p>
          <Link to="/products" className="mt-5 inline-flex">
            <Button className="rounded-lg bg-primary text-xs text-primary-foreground hover:bg-primary/90 shadow-xs">
              Start shopping
            </Button>
          </Link>
        </div>
      )}
    </DashboardSectionCard>
  );
}
