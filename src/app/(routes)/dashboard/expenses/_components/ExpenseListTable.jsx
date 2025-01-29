import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast("Expense Deleted!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense!");
    }
  };

  if (!Array.isArray(expensesList)) {
    return <p>No expenses to display.</p>;
  }

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold text-gray-500">Name</h2>
        <h2 className="font-bold text-gray-500">Amount</h2>
        <h2 className="font-bold text-gray-500">Date</h2>
        <h2 className="font-bold text-gray-500">Action</h2>
      </div>
      {expensesList.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div
            key={expenses.id} // Unique key for each item in the list
            className="border grid grid-cols-4 bg-slate-400 p-2 text-white"
          >
            <h2>{expenses.name}</h2>
            <h2>₹{expenses.amount}</h2>
            <h2>{new Date(expenses.createdAt).toLocaleDateString()}</h2>
            <h2
              onClick={() => deleteExpense(expenses)}
              className="text-red-500 cursor-pointer"
            >
              {/* Delete */}
              <Trash />
            </h2>
          </div>
        ))
      ) : (
        <p className="p-4">No expenses found.</p>
      )}
    </div>
  );
}

export default ExpenseListTable;
