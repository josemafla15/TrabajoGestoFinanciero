interface AddTransactionButtonProps {
  onClick: () => void;
}

export default function AddTransactionButton({ onClick }: AddTransactionButtonProps) {
  return (
    <button
      onClick={onClick}
      className='mt-6 px-6 py-3 bg-app-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition'
    >
      Agregar Transacción
    </button>
  );
}
