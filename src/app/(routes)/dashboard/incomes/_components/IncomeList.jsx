"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses, Incomes } from "../../../../../../utils/schema";

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getIncomelist();
  }, [user]);

  const getIncomelist = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number), // Handle null cases
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number), // Use COUNT directly
        })
        .from(Incomes)
        .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress)) // Filter by user email
        .groupBy(Incomes.id) // Group only by non-aggregated columns
        .orderBy(desc(Incomes.id)); // Order by descending income ID

      console.log("Fetched Income List:", result); // Debug output
      setIncomelist(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="mt-7 text-white">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => {
              console.log("Budget Entry:", budget);
              return <IncomeItem budget={budget} key={index} />;
            })
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
