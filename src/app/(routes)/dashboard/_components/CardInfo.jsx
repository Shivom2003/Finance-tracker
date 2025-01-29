import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  BadgeIndianRupee,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import getFinancialAdvice from "../../../../../utils/getFinancialAdvice";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  // Calculate card info when budgetList or incomeList changes
  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      calculateCardInfo();
    }
  }, [budgetList, incomeList]);

  // Fetch financial advice when totalBudget, totalIncome, or totalSpend changes
  useEffect(() => {
    const fetchFinancialAdvice = async () => {
      try {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice); // Update the state with advice
      } catch (error) {
        console.error("Error fetching financial advice:", error);
      }
    };

    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalIncome_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount || 0); // Ensure no NaN values
      totalSpend_ += element.totalSpend || 0; // Handle undefined totalSpend
    });

    incomeList.forEach((element) => {
      console.log("Income Entry:", element); // Debug income data
      totalIncome_ += element.totalAmount || 0; // Safely handle undefined
    });

    setTotalBudget(totalBudget_);
    setTotalIncome(totalIncome_);
    setTotalSpend(totalSpend_);
  };

  const formatNumber = (number) => number.toLocaleString();

  return (
    <div>
      {budgetList.length > 0 ? (
        <div>
          <div className="bg-card-color p-7 border mt-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="mb-2 flex flex-row space-x-1 items-center">
                <h2>Fin Smart AI</h2>
                <Sparkles
                  className="rounded-full text-white h-10 w-10 p-2 
                                bg-gradient-to-r
                                from-pink-500
                                via-red-500
                                to-yellow-500
                                background-animate
                                "
                />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="bg-card-color p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">
                  ₹{formatNumber(totalBudget)}
                </h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="bg-card-color p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">
                  ₹{formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="bg-card-color p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. of Budgets</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="bg-card-color p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl">
                  ₹{formatNumber(totalIncome)}
                </h2>
              </div>
              <BadgeIndianRupee className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
