export default function Card({ children }) {
  return (
    <div className="
      relative p-6 rounded-2xl 
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      shadow-md hover:shadow-2xl
      transition-all duration-300
      hover:-translate-y-2
    ">
      {children}
    </div>
  );
}