import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Places from "./components/Places";
import React from "react";
import Events from "./components/Events";
import Event from "./components/Event";

const EONET_API_URL =
  "https://eonet.gsfc.nasa.gov/api/v3/events?start=2019-01-01&end=2021-12-31&limit=5&key=";
const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
function App() {
  const [nasaData, setNasaData] = React.useState(null);

  React.useEffect(() => {
    fetch(EONET_API_URL + NASA_API_KEY)
      .then((response) => response.json())
      .then((data) => setNasaData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!nasaData) {
    return <p>Loading...</p>;
  }

  console.log(nasaData);
  let nasaElements = nasaData.events.map((element) => (
    <Events
      coordinates={element.geometry[0].coordinates}
      id={element.id}
      date={element.geometry[0].date}
    ></Events>
  ));
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/root">Home </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/places">Places </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/root" element={nasaElements}></Route>
        <Route path="/root/:id/:lat/:lon" element={<Event />}></Route>
        {/* <Route element={<Places />} path="/places"></Route> */}
      </Routes>
    </div>
  );
}

export default App;
