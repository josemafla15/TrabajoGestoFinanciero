const AddTransactionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded-md mt-8" // Aquí agregamos el margen
    >
      Agregar Transacción
    </button>
  );
};

export default AddTransactionButton;