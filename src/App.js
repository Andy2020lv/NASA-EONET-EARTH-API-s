import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/Home";
import PicDay from "./components/PicDay";
import React from "react";
import Events from "./components/Events";
import Event from "./components/Event";

function App() {
  const [category, setCategory] = React.useState("");
  const [nasaData, setNasaData] = React.useState(null);

  const EONET_API_URL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2010-01-01&end=2021-12-31&limit=12&category=${category}&key=`;
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  React.useEffect(() => {
    fetch(EONET_API_URL + NASA_API_KEY)
      .then((response) => response.json())
      .then((data) => setNasaData(data))
      .catch((error) => console.log(error));
  }, [category]);

  if (!nasaData) {
    return <p>Loading...</p>;
  }

  // console.log(nasaData);
  let nasaElements = nasaData.events.map((element) => (
    <Events
      category={category}
      coordinates={element.geometry[0].coordinates}
      id={element.id}
      date={element.geometry[0].date}
      title={element.title}
    ></Events>
  ));
  return (
    <div>
      <div className="navigation">
        <div class="btn-group">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
          >
            Categories
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" onClick={() => setCategory("wildfires")}>
                Wildfire
              </a>
            </li>

            <li>
              <a class="dropdown-item" onClick={() => setCategory("volcanoes")}>
                Volcanoes
              </a>
            </li>
          </ul>
        </div>
        <nav>
          <ul>
            <li>
              <div>
                <NavLink className="see-events" to="/root">
                  See events{" "}
                </NavLink>
                <NavLink className="see-events" to="/">
                  Pic/day
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<PicDay />}></Route>
        <Route
          path="/root"
          element=<div className="row">{nasaElements}</div>
        ></Route>
        <Route
          path="/root/:id/:lat/:lon/:title/:imgUrl"
          element={<Event />}
        ></Route>
        {/* <Route element={<Places />} path="/places"></Route> */}
      </Routes>
    </div>
  );
}

export default App;
