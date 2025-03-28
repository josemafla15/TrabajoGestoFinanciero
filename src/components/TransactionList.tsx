interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className='w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Transacciones Recientes</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className='flex justify-between p-2 border-b last:border-none'>
            <span>{t.description}</span>
            <span className={t.type === 'income' ? 'text-green-500' : 'text-red-500'}>
              {t.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
