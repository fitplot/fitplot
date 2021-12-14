export default function Button({ text, ...props }) {
  return (
    <button className="bg-black text-white p-2 border rounded" {...props}>
      {text}
    </button>
  );
}
