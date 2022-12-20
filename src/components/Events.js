import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../images/placeholder.png";
// import Placeholder from "./Placeholder";

export default function Events(props) {
  let [lon, lat] = props.coordinates.map((x) => x);
  const date = props.date.slice(0, 10);

  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=0.15&&api_key=`;
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  const [earthData, setEarthData] = React.useState(null);

  React.useEffect(() => {
    fetch(EARTH_API_URL + NASA_API_KEY)
      .then((response) => response.json())
      .then((data) => setEarthData(data))
      .catch((error) => console.log(error));
  }, [lon]);
  if (!earthData) {
    return <p>Loading...</p>;
  }
  // console.log(earthData.id);
  const encodeImg = encodeURIComponent(earthData.url);

  return (
    <div className=" col-lg-4">
      <div className="events ">
        <h1>{props.title}</h1>
        <LazyLoadImage
          placeholderSrc={placeholder}
          // placeholder={<Placeholder />}
          alt="image"
          className="sateliteImg"
          src={`${earthData.url}`}
        ></LazyLoadImage>
        <div className="events-coordinates ">
          <p>Lat: {lat}</p>

          <p>Lon: {lon}</p>
        </div>

        <p>Date: {date}</p>
        <nav>
          {" "}
          <Link
            className="go-to"
            to={`/root/${props.id}/${lat}/${lon}/${props.title}/${encodeImg}`}
          >
            {" "}
            Go to the image
          </Link>
        </nav>
      </div>
    </div>
  );
}
