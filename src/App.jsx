import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PlayerCard from "./components/PlayerCard";

function App() {
  const [playerList, setPlayerList] = useState([]);
  const [searchinput, setSearchInput] = useState("");

  const url = "https://api.npoint.io/20c1afef1661881ddc9c";

  const fetchSportzApi = async () => {
    try {
      const data = await axios.get(url);
      setPlayerList(data.data.playerList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSportzApi();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (searchinput === "") {
        return;
      }

      const fetchSportzApiData = async () => {
        try {
          const data = await axios.get(url);
          return data.data.playerList;
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      fetchSportzApiData()
        .then((data) => {
          if (Array.isArray(data)) {
            data = data.filter(
              (data) =>
                JSON.stringify(data)
                  .replace(/("\w+":)/g, "")
                  .toLowerCase()
                  .indexOf(searchinput.toLowerCase()) !== -1
            );
            setPlayerList(data);
          }
        })
        .catch((error) => console.log(error));
    };

    filterData();

    return () => {
    	fetchSportzApi();
    };
  }, [searchinput]);

  return (
    <div className="App">
      <h1>Sportz Assesment</h1>
      <input
        type="text"
        placeholder="enter search text"
        style={{ fontSize: "30px" }}
        value={searchinput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <br />
      <br />
      <main className="grid">
        {playerList &&
          playerList.map((data, index) => {
            return <PlayerCard key={data.Id} id={index} data={data} />;
          })}
      </main>
    </div>
  );
}

export default App;
