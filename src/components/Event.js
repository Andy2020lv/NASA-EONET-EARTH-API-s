import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Routes, Route, Link, NavLink, useParams } from "react-router-dom";

export default function Event(props) {
  const { id, lat, lon, title, imgUrl } = useParams();
  const url = decodeURIComponent(imgUrl);
  const zoom = 70000;

  return (
    <div className="event">
      <h5>Id: {id}</h5>
      <h4>Title: {title}</h4>
      <LazyLoadImage className="event-img" src={url}></LazyLoadImage>
      <h5>
        Lat: {lat} Lon: {lon}
      </h5>
      <a
        rel="noreferrer"
        target="_blank"
        href={`https://earth.google.com/web/@${lat},${lon},${zoom}d,0,0,0`}
      >
        See on google earth!
      </a>
    </div>
  );
}
