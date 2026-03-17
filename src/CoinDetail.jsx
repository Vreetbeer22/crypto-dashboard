import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CoinDetail.css";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=PRICE_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`)
      .then((res) => res.json())
      .then((json) => {
        const found = json?.Data?.LIST.find((c) => String(c.ID) === String(id));
        setCoin(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!coin) return <div className="loading">Coin not found.</div>;

  const change = coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD ?? 0;
  const isPositive = change >= 0;

  return (
    <div className="detail-page">
      <Link to="/" className="back-btn">← Back</Link>

      <div className="detail-header">
        <img src={coin.LOGO_URL} alt={coin.SYMBOL} className="detail-logo" />
        <div>
          <h1>{coin.NAME} <span className="detail-symbol">({coin.SYMBOL})</span></h1>
          <span className="detail-rank">Rank #{coin.TOPLIST_RANK}</span>
        </div>
      </div>

      <div className="detail-price-box">
        <div className="detail-price">
          ${coin.PRICE_USD?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={isPositive ? "positive" : "negative"}>
          {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}% (24h)
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <span className="card-label">Market Cap</span>
          <span className="card-value">${coin.MKT_CAP_USD?.toLocaleString()}</span>
        </div>
        <div className="detail-card">
          <span className="card-label">Volume (24h)</span>
          <span className="card-value">${coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD?.toLocaleString()}</span>
        </div>
        <div className="detail-card">
          <span className="card-label">Circulating Supply</span>
          <span className="card-value">{coin.SUPPLY_CIRCULATING?.toLocaleString()} {coin.SYMBOL}</span>
        </div>
        <div className="detail-card">
          <span className="card-label">Max Supply</span>
          <span className="card-value">
            {coin.SUPPLY_MAX ? `${coin.SUPPLY_MAX?.toLocaleString()} ${coin.SYMBOL}` : "Unlimited"}
          </span>
        </div>
        <div className="detail-card">
          <span className="card-label">Change (24h) USD</span>
          <span className={`card-value ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? "+" : ""}{coin.SPOT_MOVING_24_HOUR_CHANGE_USD?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="detail-card">
          <span className="card-label">Total Volume (24h)</span>
          <span className="card-value">${coin.TOTAL_VOLUME_24H_USD?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;