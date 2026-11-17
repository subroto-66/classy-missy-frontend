import { FiCheckCircle } from "react-icons/fi";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardSectionCard from "./DashboardSectionCard";
import { transactions } from "./dashboardData";

export default function TransactionHistory() {
  return (
    <DashboardSectionCard
      title="Transaction history"
      description="A clear record of your payments."
    >
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-neutral-100 last:border-0"
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
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-medium text-neutral-700">
                    <FiCheckCircle size={11} />
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardSectionCard>
  );
}
