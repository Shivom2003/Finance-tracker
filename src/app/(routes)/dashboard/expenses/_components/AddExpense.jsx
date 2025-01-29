import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/schema";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [loading, setLoading] = useState(false);
  /**
   * Used to Add New Expense
   */

  const addNewExpense = async () => {
    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt: new Date(expenseDate),
          createdBy: user.id, // Ensure this field is valid
        })
        .returning({ insertedId: Budgets.id });

      setAmount("");
      setName("");
      if (result) {
        toast("New Expense Added!");
        refreshData();
      }
    } catch (error) {
      console.error("Failed to add new expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-color border p-5 rounded-2xl">
      <h2 className="font-bold text-lg text-white">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-white font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-white font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-white font-medium my-1">Expense Date</h2>
        <Input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <Button
        disabled={!(name && amount && expenseDate) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full bg-navy-900 hover:bg-black"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
