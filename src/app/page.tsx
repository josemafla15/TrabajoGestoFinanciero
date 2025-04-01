'use client';

import { useState, useMemo } from 'react';
import Card from '../components/Card';
import TransactionList from '../components/TransactionList';
import AddTransactionButton from '../components/AddTransactionButton';
import AddTransactionForm from '../components/AddTransactionForm';
import FinancialChart from '../components/FinancialChart';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddTransaction = (description: string, amount: number, type: 'income' | 'expense', date: string) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description,
      amount,
      type,
      date,
    };
    setTransactions([...transactions, newTransaction]);
    setShowForm(false);
  };

  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: income - expense,
      totalIncome: income,
      totalExpense: expense,
    };
  }, [transactions]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8'>
      <h1 className='text-4xl font-bold text-app-text-h mb-8'>Dashboard Financiero</h1>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl'>
        <Card title='Saldo Total' amount={`$${totalBalance}`} color='bg-blue-500' />
        <Card title='Ingresos' amount={`$${totalIncome}`} color='bg-green-500' />
        <Card title='Gastos' amount={`$${totalExpense}`} color='bg-red-500' />
      </div>

      {/* Gráfico de ingresos vs gastos por día */}
      <div className="w-full max-w-4xl mt-8">
        <FinancialChart transactions={transactions} />
      </div>

      <TransactionList transactions={transactions} />

      <AddTransactionButton onClick={() => setShowForm(true)} />

      {showForm && <AddTransactionForm onAddTransaction={handleAddTransaction} />}
    </main>
  );
}
