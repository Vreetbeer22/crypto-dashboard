import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./functions/Coin.jsx";


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=PRICE_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD"
    )
      .then(res => res.json())
      .then(json => {
        setCoins(json?.Data?.LIST ?? []);
        setLoading(false);
      });
  }, []);

  const filterd = coins.filter(coin =>
    coin.NAME.toLowerCase().includes(search.toLowerCase()) ||
    coin.SYMBOL.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Crypto Dashboard</h1>
      <input
        className="search"
        type="text"
        placeholder="Search for coins..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="coin-grid">
        {filterd.map(coin => (
          <Coin key={coin.ID} coin={coin} />
        ))}
      </div>
    </div>
  );
}

export default App;