import React, { useEffect, useState } from "react";
export default function Alert() {
  const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?";
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  const [isClose, setIsClose] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const [eventSrc, setevEntSrc] = React.useState(null);
  const [eventDistance, setEventDistance] = React.useState(null);

  const [userLocation, setUserLocation] = useState(null);
  const [naturalEvents, setNaturalEvents] = useState([]);

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Make a request to the NASA EONET API to get a list of natural events
      fetch(`${EONET_API_URL}?key=${NASA_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setNaturalEvents(data.events);
        });
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && naturalEvents.length > 0) {
      // Iterate over the list of natural events, and use the Haversine formula
      // to calculate the distance between each event and the user's location
      naturalEvents.forEach((event) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          event.geometry[event.geometry.length - 1].coordinates[1],
          event.geometry[event.geometry.length - 1].coordinates[0]
        );
        // console.log(naturalEvents);
        // console.log(distance);

        // If the event is within 50km of the user's location AND active, display an alert
        if (distance <= 50 && event.closed) {
          // alert(
          //   `There is a natural event within 50km of your location: ${event.title}`
          // );
          setIsClose(true);
          setEventName(event.title);
          setevEntSrc(event.sources[0].url);
          setEventDistance(distance);
        }
      });
    }
  }, [userLocation, naturalEvents]);

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Number(d.toFixed(1));
  }

  // console.log(userLocation);
  return (
    <div style={{ color: "white" }}>
      {isClose && (
        <div style={{ width: "25rem" }} className="alert">
          {" "}
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <div>
              <p>
                Alert, {eventName} is at {eventDistance}km from you.
              </p>
              <a rel="noreferrer" target="_blank" href={eventSrc}>
                More info:
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
