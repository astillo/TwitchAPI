import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
function Games() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/games/top");
      let dataArray = result.data.data;
      let finalArray = dataArray.map(e => {
        let imgUrl = e.box_art_url
          .replace("{width}", "1000")
          .replace("{height}", "1300");
        e.box_art_url = imgUrl;
        return e;
      });
      setGames(finalArray);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1>Popular Games</h1>
      <div className="row">
        {games.map(e => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <div className="card">
              <img className="card-img-top" src={e.box_art_url} alt="heello" />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <button className="btn btn-danger">
                  <Link
                    className="link"
                    to={{
                      pathname: "game/" + e.name,
                      state: {
                        gameId: e.id
                      }
                    }}
                  >
                    {e.name} Streams{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
