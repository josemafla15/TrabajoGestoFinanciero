import React, { useState, useEffect } from 'react';

interface AddTransactionFormProps {
  onAddTransaction: (description: string, amount: number, type: 'income' | 'expense', date: string) => void;
  onEditTransaction: (id: number, description: string, amount: number, type: 'income' | 'expense', date: string) => void;
  transactionToEdit: { id: number; description: string; amount: number; type: 'income' | 'expense'; date: string } | null;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction, onEditTransaction, transactionToEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [date, setDate] = useState<string>('');

  // Si hay una transacción para editar, cargar sus valores
  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount.toString());
      setType(transactionToEdit.type);
      setDate(transactionToEdit.date); // Cargar la fecha al editar
    }
  }, [transactionToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (transactionToEdit) {
      // Editar transacción
      onEditTransaction(transactionToEdit.id, description, parseFloat(amount), type, date);
    } else {
      // Agregar nueva transacción
      onAddTransaction(description, parseFloat(amount), type, date);
    }

    // Resetear el formulario después de enviar
    setDescription('');
    setAmount('');
    setType('income');
    setDate('');
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
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {transactionToEdit ? 'Editar Transacción' : 'Añadir Transacción'}
      </button>
    </form>
  );
};

export default AddTransactionForm;
