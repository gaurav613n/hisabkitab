import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

import { PolarArea } from 'react-chartjs-2';
import HIstory from './HIstory';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Polar chart data
const dataPolar = {
  labels: ['food', 'transport', 'entertainment', 'utitles'],
  datasets: [
    {
      label: 'expense',
      data: [75, 90, 60, 80, 65],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const optionsPolar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'My Skill Spectrum (Polar)',
      font: {
        size: 18,
      },
    },
  },
};



const Chart = () => {
  return (
    <div className="flex p-6 bg-gray-200 rounded-2xl items-center justify-center">
      <div className="w-[30vw] h-[40vh] bg-white rounded-2xl p-4 shadow">
        <PolarArea data={dataPolar} options={optionsPolar} />
      </div>
      <HIstory/>
    </div>
  );
};

export default Chart;
