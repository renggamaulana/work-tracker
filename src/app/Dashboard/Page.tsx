'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import MainContainer from '@/components/MainContainer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ContributorSummary {
  employee_name: string;
  total_hours: number;
}

interface WorkLogSummaryData {
  contributors: ContributorSummary[];
}

const Dashboard: React.FC = () => {
  const [worklogSummary, setWorklogSummary] = useState<WorkLogSummaryData>({
    contributors: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<boolean>(false);

  // Format date to yyyy-mm-dd without timezone offset
  const formatDateToLocal = (date: Date | null): string | null => {
    if (!date) return null;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  };

  const fetchWorklogSummary = async () => {
    setLoading(true);
    setError(false);

    const API_URL =
      (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api') +
      '/work-logs/summary';

    try {
      const params: { start_date?: string; end_date?: string } = {};
      if (startDate && endDate) {
        params.start_date = formatDateToLocal(startDate) ?? undefined;
        params.end_date = formatDateToLocal(endDate) ?? undefined;
      }
      const response = await axios.get<{ error?: boolean; data?: WorkLogSummaryData }>(
        API_URL,
        { params }
      );

      if (response.data.error) {
        setError(true);
        setWorklogSummary({ contributors: [] });
      } else {
        setWorklogSummary(response.data.data ?? { contributors: [] });
      }
    } catch (err) {
      setError(true);
      setWorklogSummary({ contributors: [] });
      console.error('Error fetching worklog summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorklogSummary();
  }, []);

  // Colors generator
  const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 50%)`;

  const labels = worklogSummary.contributors?.map((c) => c.employee_name) ?? [];
  const colors = labels.map(() => getRandomColor());
  const dataValues = worklogSummary.contributors?.map((c) => c.total_hours) ?? [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Hours Worked',
        data: dataValues,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('50%', '40%')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <MainContainer>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load data</p>
        ) : (
          <div className="mt-8 bg-black/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Work Logs Summary (Total Hours per Employee)
            </h2>

            <div className="mb-4 flex gap-4 justify-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="p-2 bg-white text-black rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="End Date"
                className="p-2 bg-white text-black rounded"
              />
              <button
                onClick={fetchWorklogSummary}
                className="p-2 bg-blue-500/20 hover:bg-blue-600/50 text-white rounded-lg cursor-pointer font-semibold"
              >
                Filter
              </button>
            </div>

            {labels.length > 0 ? (
              <Bar data={chartData} />
            ) : (
              <p className="text-gray-300 text-center">No work log data available</p>
            )}
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default Dashboard;
