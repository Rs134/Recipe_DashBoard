import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

function Charts({ summaryStats }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#33AABB', '#9932CC', '#DC143C'];

  const lineChartData = summaryStats?.healthScores || [];

  const readyTimeData = summaryStats?.healthScores?.map((recipe, index) => ({
    name: recipe.name,
    value: recipe.readyInMinutes || 0,
  })) || [];

  return (
    <div className="charts">
      <div className="chart-container">
        <h3>Health Score by Recipe</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="healthScore" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Ready In Minutes by Recipe</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={readyTimeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {readyTimeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
