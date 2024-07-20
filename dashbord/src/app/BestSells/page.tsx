"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import Chart from 'react-apexcharts';

const DoughnutChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), { ssr: false });
const LineChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });
const PolarAreaChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.PolarArea), { ssr: false });

const doughnutData = {
  labels: ['House', 'Apartment', 'Traditional House', 'Guest House'],
  datasets: [{
    data: [44, 55, 13, 43, 22],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
    ],
  }],
};

const lineOptions = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      "2018-09-19T00:00:00.000Z", 
      "2018-09-19T01:30:00.000Z", 
      "2018-09-19T02:30:00.000Z", 
      "2018-09-19T03:30:00.000Z", 
      "2018-09-19T04:30:00.000Z", 
      "2018-09-19T05:30:00.000Z", 
      "2018-09-19T06:30:00.000Z"
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

const lineSeries = [{
  name: 'January',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'February',
  data: [11, 32, 45, 32, 34, 52, 41]
}, {
  name: 'March',
  data: [11, 32, 45, 32, 34, 52, 41]
}, {
  name: 'April',
  data: [11, 32, 45, 32, 34, 52, 41]
}, {
  name: 'May',
  data: [11, 32, 45, 32, 34, 52, 41]
}];

const barData = {
  labels: ['Category A', 'Category B', 'Category C', 'Category D'],
  datasets: [{
    label: 'Sales Comparison',
    data: [30, 40, 25, 35],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
    ],
  }],
};

const polarAreaData = {
  labels: ['Male', 'Female'],
  datasets: [{
    data: [5, 7],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
    ],
  }],
};

const BestSellingCharts = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Most Popular Accommodation Types
          </div>
          <div className="p-4">
            <div className="h-80">
              <DoughnutChart data={doughnutData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Most Popular Property Types</h2>
            <ul className="list-disc list-inside">
              <li>Apartments are the most popular accommodation type.</li>
              <li>Houses follow closely behind in popularity.</li>
              <li>Traditional houses and guest houses have lower popularity compared to others.</li>
            </ul>
          </div>
        </div>

       
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Booking Trends
          </div>
          <div className="p-4">
            <div className="h-80">
              <Chart options={lineOptions} series={lineSeries} type="area" height={350} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Monthly Booking Overview</h2>
            <p className="text-gray-700">
              Analyze the booking trends month-over-month to identify growth patterns.
            </p>
          
          </div>
        </div>

      
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Average Score by Gender
          </div>
          <div className="p-4">
            <div className="h-80">
              <PolarAreaChart data={polarAreaData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gender Average Scores</h2>
            <p className="text-gray-700">
              View average scores for different genders.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingCharts;
