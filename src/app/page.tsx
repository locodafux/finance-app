'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from 'chart.js';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

const MiniCalendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();

  const rows = [];
  let days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<td key={`empty-${i}`} className="h-8"></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate.getDate();

    days.push(
      <td
        key={`day-${day}`}
        className={`h-8 text-center text-xs p-1 ${
          isToday ? 'bg-green-500 text-white rounded-full' : 'hover:bg-gray-700'
        }`}
      >
        {day}
      </td>
    );

    if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
      rows.push(<tr key={`week-${day}`}>{days}</tr>);
      days = [];
    }
  }

  return (
    <div className="text-white h-full flex flex-col">
      <div className="text-center font-medium mb-2">
        {currentMonth} {currentYear}
      </div>
      <table className="w-full h-full table-fixed">
        <thead>
          <tr className="text-xs text-gray-400">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <th key={day} className="pb-1">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr]:h-[calc(100%/6)]">{rows}</tbody>
      </table>
    </div>
  );
};

export default function Home() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const donutChartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Income',
              data: [30, 45, 28, 60, 50, 75],
              borderColor: 'green',
              backgroundColor: 'rgba(75, 192, 75, 0.2)',
              fill: false,
              tension: 0.4,
            },
            {
              label: 'Expenses',
              data: [20, 35, 40, 55, 65, 80],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: 'white' },
            },
          },
          scales: {
            x: {
              ticks: { color: 'white' },
              grid: { color: '#333' },
            },
            y: {
              ticks: { color: 'white' },
              grid: { color: '#333' },
            },
          },
        },
      });
    }

    if (donutChartRef.current) {
      donutChartInstanceRef.current = new Chart(donutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Expenses', 'Income'],
          datasets: [
            {
              label: 'Income vs. Expenses',
              data: [300, 100],
              backgroundColor: ['rgb(255, 99, 132)', 'green'],
              hoverOffset: 30,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: 'white' },
              position: 'top',
            },
          },
        },
      });
    }

    return () => {
      chartInstanceRef.current?.destroy();
      donutChartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-black text-white flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 text-center">
        <span className="font-bold">Good morning,</span> Jane Doe!
      </h1>
      <h3 className="text-lg sm:text-xl mb-4 text-center">Welcome Back</h3>

      <div className="w-full max-w-6xl flex flex-col gap-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/5 h-64 sm:h-80 bg-[#181818] rounded-xl p-4">
            <canvas className="w-full h-full" ref={chartRef} />
          </div>
          <div className="w-full lg:w-2/5 h-64 sm:h-80 bg-[#181818] rounded-xl p-4">
            <MiniCalendar />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/5 bg-[#181818] rounded-xl p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            <span className="text-xl font-semibold">Transactions</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-md">Spotify</span>
                  <span className="text-xs text-gray-500">April 18, 2022 11:01 AM</span>
                </div>
                <span className="text-xl font-bold text-green-500">$400</span>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <div className="w-full h-64 bg-[#181818] rounded-xl p-4">
              <canvas className="w-full h-full" ref={donutChartRef} />
            </div>
            <div className="w-full bg-[#181818] rounded-xl p-4 flex flex-col gap-2">
              <span className="text-sm text-gray-500">Total Balance</span>
              <span className="text-2xl font-bold">$7,540.00</span>
              <span className="text-green-400">+8.00%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
