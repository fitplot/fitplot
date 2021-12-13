export default function Button(props) {
  return (
    <button
      className="bg-black text-white p-2 border rounded font-mono"
      onClick={props.handleClick}
    >
      {props.buttonName}
    </button>
  );
}
