import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { motion } from 'framer-motion';
import { FaChartLine, FaTrophy, FaMedal, FaFire, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "../../styles/components/statsOverview.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StatsOverview = () => {
  const [stats, setStats] = useState({
    totalMatches: 45,
    winRate: 75,
    totalGoals: 120,
    avgRating: 4.7,
    recentPerformance: [8, 7, 9, 8, 7, 8, 9],
    sportDistribution: {
      football: 60,
      basketball: 25,
      tennis: 15
    }
  });

  const doughnutData = {
    labels: ['Football', 'Basketball', 'Tennis'],
    datasets: [
      {
        data: [
          stats.sportDistribution.football,
          stats.sportDistribution.basketball,
          stats.sportDistribution.tennis
        ],
        backgroundColor: [
          '#4361ee',
          '#f72585',
          '#4cc9f0'
        ],
        borderColor: [
          '#3a56d4',
          '#e01e69',
          '#45b5d9'
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Performance Score',
        data: stats.recentPerformance,
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const statCards = [
    {
      title: 'Total Matches',
      value: stats.totalMatches,
      icon: <FaChartLine />,
      color: '#4361ee',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: <FaTrophy />,
      color: '#f72585',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Total Goals',
      value: stats.totalGoals,
      icon: <FaMedal />,
      color: '#4cc9f0',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating,
      icon: <FaFire />,
      color: '#7209b7',
      change: '+0.3',
      trend: 'up'
    }
  ];

  return (
    <div className="stats-overview">
      <div className="stats-header">
        <h2>Performance Overview</h2>
        <p>Weekly performance and statistics</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="stat-card-header">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
              >
                {card.icon}
              </div>
              <div className="stat-trend">
                <span className={`trend-${card.trend}`}>
                  {card.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  {card.change}
                </span>
              </div>
            </div>
            <div className="stat-card-body">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="chart-header">
            <h3>Sport Distribution</h3>
            <p>Percentage of participation in different sports</p>
          </div>
          <div className="chart-wrapper">
            <Doughnut data={doughnutData} options={options} />
          </div>
        </motion.div>

        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="chart-header">
            <h3>Weekly Performance</h3>
            <p>Daily performance scores (Last 7 days)</p>
          </div>
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsOverview;