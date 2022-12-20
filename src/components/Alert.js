import React from "react";
export default function Alert() {
  const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?";
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  const [location, setLocation] = React.useState({});
  const [isClose, setIsClose] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [eventName, setEventName] = React.useState("");
  const [eventSrc, setevEntSrc] = React.useState(null);

  React.useEffect(() => {
    fetch(EONET_API_URL + NASA_API_KEY)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  let lon;
  let lat;

  //   data.events.forEach((event) => {
  //     event.geometry.forEach((geometry) => {
  //       lon = geometry.coordinates[0];
  //       lat = geometry.coordinates[1];
  //     });
  //   });

  //   console.log(lon);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  };
  console.log(location);
  function haversineDistance(coords1, coords2) {
    const earthRadius = 6371; // km
    let lat1 = coords1.latitude;
    let lon1 = coords1.longitude;
    let lat2 = coords2.latitude;
    let lon2 = coords2.longitude;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate distance using Haversine function
    data.events.forEach((event) => {
      const lastGeometry = event.geometry[event.geometry.length - 1];

      lon = lastGeometry.coordinates[0];
      lat = lastGeometry.coordinates[1];
      const distance = haversineDistance(location, {
        latitude: lat,
        longitude: lon,
      });
      // Check if distance is less than 10 km and if it is closed or not.
      if (distance <= 50 && !event.closed) {
        console.log(`The distance is ${distance} km. Event: ${event.title}`);
        setIsClose(true);
        setEventName(event.title);
        setevEntSrc(event.sources[0].url);
      }
    });
  };
  console.log(isClose);
  return (
    <div style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="longitude">Longitude:</label>
        <input
          onChange={handleChange}
          type="text"
          id="longitude"
          name="longitude"
        />
        <br />
        <label htmlFor="latitude">Latitude:</label>
        <input
          onChange={handleChange}
          type="text"
          id="latitude"
          name="latitude"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {isClose && (
        <div style={{ width: "25rem" }} className="alert">
          {" "}
          <div
            class="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <div>
              <p>Alert, {eventName} is close to you.</p>
              <a href={eventSrc}>More info:</a>
            </div>
          </div>
        </div>
      )}
      {/* <p>{lon}</p> */}
      {/* <p>{lat}</p> */}
    </div>
  );
}
