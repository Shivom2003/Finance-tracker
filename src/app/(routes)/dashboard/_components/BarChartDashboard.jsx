import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="bg-card-color border rounded-2xl p-10 pl-20">
      <h2 className="font-bold text-lg text-white">Activity</h2>

      <ResponsiveContainer width={"70%"} height={300}>
        <BarChart data={budgetList} margin={{ top: 7 }}>
          <XAxis dataKey="name" stroke="#FFFFFF" />
          <YAxis stroke="#FFFFFF" />
          <Tooltip />
          <Legend wrapperStyle={{ color: "#FFFFFF" }} />
          {/* <Bar dataKey="totalSpend" stackId="a" fill="#660066" />
          <Bar dataKey="amount" stackId="a" fill="#cc0000" /> */}
          <Bar
            dataKey="totalSpend"
            stackId="a"
            fill="#660066"
            barSize={100} // Reduce bar width
            stroke="#FFFFFF" // Border color
            strokeWidth={2} // Border thickness
          />
          <Bar
            dataKey="amount"
            stackId="a"
            fill="#e60000"
            barSize={100} // Reduce bar width
            stroke="#FFFFFF" // Border color
            strokeWidth={2} // Border thickness
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
