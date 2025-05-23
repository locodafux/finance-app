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
  DoughnutController, // added for donut
  ArcElement,         // added for donut
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
  DoughnutController, 
  ArcElement         
);

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
              tension: 0,
            },
            {
              label: 'Expenses',
              data: [20, 35, 40, 55, 65, 80],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              tension: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: 'white' } },
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
              backgroundColor: [
                'rgb(255, 99, 132)',
                'green',
              ],
              hoverOffset: 30,
              borderWidth: 0, 
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: 'white' }, position: 'top'},
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
    <div className="w-screen h-screen flex items-center flex-col p-24 bg-black text-white">
      <h1 className="text-4xl mb-2">
        <span className="font-bold">Good morning,</span> Jane Doe!
      </h1>
      <h3 className="text-2xl mb-3">Welcome Back</h3>

      <div className="flex flex-col lg:w-[60%] lg:h-full gap-y-4">
        <div className="w-full flex gap-4 h-[40%]">
          <div className="w-[60%] h-full bg-[#181818] rounded-xl p-4">
            <canvas className="w-full h-full" style={{ display: 'block' }} ref={chartRef} />
          </div>
          <div className="w-[40%] h-full bg-[#181818] rounded-xl p-4">
          </div>
        </div>
        <div className="w-full flex gap-4 h-[60%]">
          <div className="w-[60%] h-full bg-[#181818] rounded-xl"></div>
          <div className="flex flex-col w-[40%] h-full gap-4">
            <div className="w-full h-[60%] bg-[#181818] rounded-xl p-3">
          <canvas className="w-full h-full" style={{ display: 'block' }} ref={donutChartRef} />

            </div>
            <div className="w-full h-[40%] bg-[#181818] rounded-xl flex flex-col gap-2 p-4">
              <span className='text-sm text-gray-500'>Total Balance</span>
              <span className='text-2xl font-bold'>$7,540.00</span>
              <span className='text-green-400'>+8.00%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
