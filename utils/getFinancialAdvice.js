const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    const response = await fetch("/api/get-financial-advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalBudget, totalIncome, totalSpend }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch financial advice");
    }

    const data = await response.json();
    return data.advice || "No advice available.";
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Error fetching financial advice. Please try again.";
  }
};

export default getFinancialAdvice;