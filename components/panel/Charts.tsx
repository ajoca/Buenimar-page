"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: any[];
  title: string;
}

export function SalesLineChart({ data, title }: SalesChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              color: "#f3f4f6",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={2} dot={{ fill: "#dc2626" }} />
          <Line type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryPieChart({ data, title }: SalesChartProps) {
  const COLORS = ["#dc2626", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ index }) => {
              const item = data[index || 0];
              return `${item.category}: ${item.percentage}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="sales"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              color: "#f3f4f6",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RegionalBarChart({ data, title }: SalesChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="region" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              color: "#f3f4f6",
            }}
          />
          <Bar dataKey="sales" fill="#dc2626" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
