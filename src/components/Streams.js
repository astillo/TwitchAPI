import React, { useState, useEffect } from "react";
import api from "../api";

function Streams() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(
        "https://api.twitch.tv/helix/streams?language=en"
      );
      let dataArray = res.data.data;
      let gameIDs = dataArray.map(e => {
        return e.game_id;
      });
      console.log(gameIDs);
      let baseUrl = "https://api.twitch.tv/helix/games?";
      let queryParms = "";
      gameIDs.map(e => {
        return (queryParms = queryParms + `id=${e}&`);
      });

      let finalUrl = baseUrl + queryParms;
      let gameName = await api.get(finalUrl);
      let gameNameArray = gameName.data.data;
      let finalArray = dataArray.map(stream => {
        stream.gameName = "";
        gameNameArray.map(name => {
          if (stream.game_id === name.id) {
            return (stream.gameName = name.name);
          }
        });
        let imgUrl = stream.thumbnail_url
          .replace("{width}", "1920")
          .replace("{height}", "1080");
        stream.thumbnail_url = imgUrl;
        return stream;
      });
      setChannels(finalArray);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Most Popular Live Streams</h1>
      <div className="row">
        {channels.map(channel => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <div className="card">
              <img className="card-img-top" src={channel.thumbnail_url} />
              <div className="card-body">
                <h3 className="card-title">{channel.user_name}</h3>
                <h5 className="card-text"> {channel.gameName}</h5>
                <div className="card-text">
                  {channel.viewer_count} live viewers
                </div>
                <button className="btn btn-danger">
                  <a
                    href={"https://twitch.tv/" + channel.user_name}
                    className="link"
                    target="_blank"
                  >
                    watch {channel.user_name}'s' stream
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streams;
