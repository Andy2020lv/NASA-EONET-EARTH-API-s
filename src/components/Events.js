import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Event from "./Event";

export default function Events(props) {
  let [lon, lat] = props.coordinates.map((x) => x);
  const date = props.date.slice(0, 10);

  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=0.25&api_key=`;
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  //   const regex = /(\d{4})-(\d{2})-(\d{2})/;
  //   const regex = /\d{4}-\d{2}-\d{2}/;

  const [earthData, setEarthData] = React.useState(null);

  React.useEffect(() => {
    fetch(EARTH_API_URL + NASA_API_KEY)
      .then((response) => response.json())
      .then((data) => setEarthData(data))
      .catch((error) => console.log(error));
  }, []);
  if (!earthData) {
    return <p>Loading...</p>;
  }

  //   alert(earthData.url);

  <Event id={props.id} lon={lon} lat={lat} />;

  return (
    <div>
      <h1>{props.id}</h1>
      <p>{lon}</p>
      <p>{lat}</p>
      <img className="sateliteImg" alt="" src={earthData.url}></img>
      <p>{date}</p>
      {/* <p>{props.lon}</p> */}
      <nav>
        {" "}
        <Link to={`/root/${props.id}/${lat}/${lon}`}> Go to the image</Link>
      </nav>
    </div>
  );
}
