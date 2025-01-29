import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div
        className="bg-card-color p-5 border rounded-2xl
    hover:shadow-md cursor-pointer h-[145px]"
      >
        <div className="flex gap-2 items-center justify-between text-white">
          <div className="flex gap-2 items-center">
            <h2
              className="text-2xl p-3 px-4
              bg-slate-100 rounded-full 
              "
            >
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-white">{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-white text-lg"> ₹{budget.amount}</h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 text-white">
            <h2 className="text-xs text-white">
              ₹{budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-white">
              ₹{budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div
            className="w-full
              bg-slate-300 h-2 rounded-full"
          >
            <div
              className="
              bg-green-500 h-2 rounded-full border"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
