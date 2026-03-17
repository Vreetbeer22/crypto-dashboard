import { Link } from "react-router-dom";
import "./Coin.css";

function Coin({ coin }) {
  return (
    <Link to={`/coin/${coin.ID}`} className="coin-link">
      <div className="coin-box">
        <img className="coin-logo" src={coin.LOGO_URL} alt={coin.SYMBOL} />
        <div className="coin-symbol">{coin.SYMBOL}</div>
        <div className="coin-name">{coin.NAME}</div>
        <div className="coin-price">
          ${coin.PRICE_USD?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </Link>
  );
}

export default Coin;