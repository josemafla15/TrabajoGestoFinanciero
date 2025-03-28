'use client'; // Si usas Next.js App Router

import { useState } from 'react';
import Card from '../components/Card';
import TransactionList from '../components/TransactionList';
import AddTransactionButton from '../components/AddTransactionButton';
import AddTransactionForm from '../components/AddTransactionForm';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: 'Sueldo', amount: 1500, type: 'income' },
    { id: 2, description: 'Cena', amount: 30, type: 'expense' },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddTransaction = (description: string, amount: number, type: 'income' | 'expense') => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description,
      amount,
      type,
    };
    setTransactions([...transactions, newTransaction]);
    setShowForm(false);
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8'>
      <h1 className='text-4xl font-bold text-app-text-h mb-8'>Dashboard Financiero</h1>

      {/* Tarjetas de Resumen */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl'>
        <Card title='Saldo Total' amount={5000} color='bg-blue-500' />
        <Card title='Ingresos' amount={3000} color='bg-green-500' />
        <Card title='Gastos' amount={2000} color='bg-red-500' />
      </div>

      {/* Lista de Transacciones */}
      <TransactionList transactions={transactions} />

      {/* Botón para Agregar Transacciones */}
      <AddTransactionButton onClick={() => setShowForm(true)} />

      {/* Mostrar Formulario si showForm es true */}
      {showForm && <AddTransactionForm onAddTransaction={handleAddTransaction} />}
    </main>
  );
}
