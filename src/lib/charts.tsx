"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Viewcharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getChartData = async () => {
      const res = await fetch("/api/analytics/views");
      const json = await res.json();
      setData(json);
    };
    getChartData();
  }, []);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <Tooltip />
          <Bar dataKey="views" fill="#60a5fa" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
