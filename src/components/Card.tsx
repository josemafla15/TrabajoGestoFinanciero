interface CardProps {
    title: string;
    amount: number | string;
    color: string;
  }
  
  export default function Card({ title, amount, color }: CardProps) {
    return (
      <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <p className='text-3xl font-bold'>{amount}</p>
      </div>
    );
  }
  