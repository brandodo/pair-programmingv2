export default function Input({ name, clickHandler, playSound }) {
  return (
    <div
      className="pokemonGuess"
      onMouseEnter={() => playSound()}
      onClick={() => clickHandler(name)}
    >
      {name}
    </div>
  );
}
