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
  DoughnutController,
  ArcElement,
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

const MiniCalendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
  const currentYear = currentDate.getFullYear();
  
  // Get days in month
  const daysInMonth = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth() + 1, 
    0
  ).getDate();
  
  // Get first day of month (0-6 where 0 is Sunday)
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    1
  ).getDay();

  // Generate calendar grid
  const weeks = [];
  let week = [];
  
  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate.getDate();
    
    week.push(
      <div 
        key={`day-${day}`}
        className={`w-6 h-6 flex items-center justify-center text-xs rounded-full
          ${isToday ? 'bg-green-500 text-white' : 'hover:bg-gray-700'}`}
      >
        {day}
      </div>
    );
    
    if (week.length === 7 || day === daysInMonth) {
      weeks.push(
        <div key={`week-${day}`} className="flex justify-between mb-1">
          {week}
        </div>
      );
      week = [];
    }
  }

  return (
    <div className="text-white">
      <div className="text-center font-medium mb-2">
        {currentMonth} {currentYear}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="w-6 text-center">{day}</div>
        ))}
      </div>
      <div className="flex flex-col">
        {weeks}
      </div>
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
      <h3 className="text-2xl mb-6">Welcome Back</h3>

      <div className="flex flex-col lg:w-[60%] lg:h-full gap-y-4">
        <div className="w-full flex gap-4 h-[40%]">
          <div className="w-[60%] h-full bg-[#181818] rounded-xl p-4">
            <canvas className="w-full h-full" style={{ display: 'block' }} ref={chartRef} />
          </div>
          <div className="w-[40%] h-full bg-[#181818] rounded-xl p-4">
            <MiniCalendar />
          </div>
        </div>
        <div className="w-full flex gap-x-4 h-[60%]">
          <div className="w-[60%] h-full bg-[#181818] rounded-xl p-6 gap-4 flex flex-col">
            <span className='text-xl font-semibold mb-6'>Transactions</span>

            <div className='flex justify-between '>
              <div className='flex flex-col'>
                <span className='text-md'>Spotify</span>
                <span className='text-xs text-gray-500'>April 18, 2022 11:01 AM</span>
                </div>
                <span className='text-xl font-bold text-green-500'>$400</span>
            </div>

            <div className='flex justify-between '>
              <div className='flex flex-col'>
                <span className='text-md'>Spotify</span>
                <span className='text-xs text-gray-500'>April 18, 2022 11:01 AM</span>
                </div>
                <span className='text-xl font-bold text-green-500'>$400</span>
            </div>

            <div className='flex justify-between '>
              <div className='flex flex-col'>
                <span className='text-md'>Spotify</span>
                <span className='text-xs text-gray-500'>April 18, 2022 11:01 AM</span>
                </div>
                <span className='text-xl font-bold text-green-500'>$400</span>
            </div>

            <div className='flex justify-between '>
              <div className='flex flex-col'>
                <span className='text-md'>Spotify</span>
                <span className='text-xs text-gray-500'>April 18, 2022 11:01 AM</span>
                </div>
                <span className='text-xl font-bold text-green-500'>$400</span>
            </div>

             <div className='flex justify-between '>
              <div className='flex flex-col'>
                <span className='text-md'>Spotify</span>
                <span className='text-xs text-gray-500'>April 18, 2022 11:01 AM</span>
                </div>
                <span className='text-xl font-bold text-green-500'>$400</span>
            </div>

          </div>
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