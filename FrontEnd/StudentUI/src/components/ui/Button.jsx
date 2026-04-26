export default function Button({ children, ...props }) {
  return (
    <button
      className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
      {...props}
    >
      {children}
    </button>
  );
}