export default function Input({ name, clickHandler }) {
  return <div className="pokemonGuess" onClick={() => clickHandler(name) }>{name}</div>;
}
