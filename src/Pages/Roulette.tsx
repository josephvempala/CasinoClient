import RouletteWheel from "../components/RouletteGame/RouletteWheel";

export default function Roulette() {
  return (
    <div>
      <RouletteWheel />
      <div className="bets-display">
        <ul className="bets-list">
        </ul>
        <ul className="bets-list">
        </ul>
        <ul className="bets-list">
        </ul>
      </div>
    </div>
  );
}
