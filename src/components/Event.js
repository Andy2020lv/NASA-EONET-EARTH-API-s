import React from "react";
import { Routes, Route, Link, NavLink, useParams } from "react-router-dom";

export default function Event(props) {
  const { id, lat, lon } = useParams();
  return (
    <div>
      <h1>
        {lat} {lon}
      </h1>{" "}
      {id}
    </div>
  );
}
