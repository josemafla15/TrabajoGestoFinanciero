import React, { useState } from 'react';

interface AddTransactionFormProps {
  onAddTransaction: (description: string, amount: number, type: 'income' | 'expense') => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAddTransaction(description, parseFloat(amount), type);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-xl w-full max-w-md">
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
        className="border p-2 rounded-md w-full"
      >
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Añadir Transacción</button>
    </form>
  );
};

export default AddTransactionForm;
