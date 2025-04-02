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
  date: string; // Asegúrate de que la transacción tenga la propiedad date
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Empezamos con una lista vacía
  const [showForm, setShowForm] = useState(false); // Usamos setShowForm en lugar de setShow
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null); // Estado para la transacción que se está editando

  const handleAddTransaction = (description: string, amount: number, type: 'income' | 'expense', date: string) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description,
      amount,
      type,
      date, // Asegúrate de pasar la fecha correctamente
    };
    setTransactions([...transactions, newTransaction]);
    setShowForm(false); // Ocultar el formulario después de agregar
  };

  const handleEditTransaction = (id: number, description: string, amount: number, type: 'income' | 'expense', date: string) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === id ? { ...t, description, amount, type, date } : t // Asegurarse de que la fecha esté siendo actualizada correctamente
    );
    setTransactions(updatedTransactions);
    setTransactionToEdit(null); // Limpiar el estado de edición después de editar
    setShowForm(false); // Ocultar el formulario después de editar
  };

  // 🗑️ Nueva función para eliminar una transacción
  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // 💰 Calcular Saldo, Ingresos y Gastos dinámicamente
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-app-text-h mb-8">Dashboard Financiero</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card title="Saldo Total" amount={`$${totalBalance}`} color="bg-blue-500" />
        <Card title="Ingresos" amount={`$${totalIncome}`} color="bg-green-500" />
        <Card title="Gastos" amount={`$${totalExpense}`} color="bg-red-500" />
      </div>

      {/* Gráfico de Finanzas */}
      <div className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <FinancialChart transactions={transactions} />
      </div>

      {/* Lista de Transacciones */}
      <TransactionList
        transactions={transactions}
        onEditTransaction={(transaction) => {
          setTransactionToEdit(transaction);
          setShowForm(true); // Mostrar el formulario al editar
        }}
        onDeleteTransaction={handleDeleteTransaction} // 🔥 Pasamos la nueva función de eliminar
      />

      {/* Botón para agregar transacción, ahora con margen superior */}
      {!showForm && (
        <AddTransactionButton onClick={() => setShowForm(true)} />
      )}

      {/* Formulario para agregar o editar transacción */}
      {showForm && (
        <AddTransactionForm
          transactionToEdit={transactionToEdit} // Pasamos la transacción a editar, si existe
          onAddTransaction={handleAddTransaction}
          onEditTransaction={handleEditTransaction} // Pasamos la función de editar
        />
      )}
    </main>
  );
}
