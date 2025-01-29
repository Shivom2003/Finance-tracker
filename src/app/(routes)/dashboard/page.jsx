"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import BudgetItem from "./budgets/_components/BudgetItem";
import { db } from "../../../../utils/dbConfig";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes), // Select all income fields
          totalAmount: sql`COALESCE(SUM(${Incomes.amount}), 0)`.mapWith(Number),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id);

      console.log("Fetched Incomes:", result); // Debug fetched data
      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="p-8 bg-page-gradient text-white">
      <h2 className="font-bold text-4xl">Hi, Welcome {user?.fullName} 👋 </h2>
      <p className="text-gray-400">
        Here's what happening with your money. Let's manage your expenses!
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>

        <div className="grid gap-5" style={{ marginBottom: 250 }}>
          <h2 className="font-bold text-xl">Latest Budget</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget) => (
                <BudgetItem budget={budget} key={budget.id} />
              ))
            : [1, 2, 3, 4].map((item) => (
                <div
                  key={item} // Added a unique key for the skeleton loaders
                  className="h-[180px] w-full bg-slate-200 lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
