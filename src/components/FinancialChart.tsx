import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useMemo } from 'react';
import dayjs from 'dayjs'; // Usamos Day.js para manejar las fechas

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface FinancialChartProps {
  transactions: Transaction[];
}

const FinancialChart: React.FC<FinancialChartProps> = ({ transactions }) => {
  // Agrupar las transacciones por fecha
  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: { income: number; expense: number } } = {};

    transactions.forEach((t) => {
      const date = dayjs(t.date).format('YYYY-MM-DD'); // Formateamos la fecha como 'YYYY-MM-DD'
      
      if (!groups[date]) {
        groups[date] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        groups[date].income += t.amount;
      } else {
        groups[date].expense += t.amount;
      }
    });

    return groups;
  }, [transactions]);

  // Datos del gráfico
  const labels = Object.keys(groupedByDate); // Días
  const incomeData = labels.map((date) => groupedByDate[date].income);
  const expenseData = labels.map((date) => groupedByDate[date].expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gastos',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ingresos vs Gastos por Día',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FinancialChart;
