"use client";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import ExpenseListTable from "./_components/ExpenseListTable";

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log("User in useEffect:", user);
    if (user) {
      console.log("Fetching expenses...");
      getAllExpenses();
    }
  }, [user]);

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Expenses) // Fetch directly from Expenses table
      .where(eq(Expenses.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));

    console.log("Fetched expenses:", result);
    setExpensesList(result);
  };

  return (
    <div className="p-10 bg-page-gradient text-white">
      <h2 className="font-bold text-3xl">My Expenses</h2>

      <ExpenseListTable
        refreshData={() => getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  );
}

export default ExpensesScreen;
