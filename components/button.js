export default function Button(props) {
  return (
    <button
      className="bg-black text-white p-2 rounded-lg font-mono"
      onClick={props.handleClick}
    >
      {props.buttonName}
    </button>
  );
}
