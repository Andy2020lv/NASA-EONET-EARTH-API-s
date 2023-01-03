// import React from "react";
// import Alert from "./Alert";

// export default function AlertCall() {
//   const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?";
//   const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
//   // const [location, setLocation] = React.useState({});
//   const [data, setData] = React.useState(null);
//   React.useEffect(() => {
//     fetch(EONET_API_URL + NASA_API_KEY)
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.log(error));
//   }, []);

//   if (!data) {
//     return (
//       <div className="loading">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   let alertElements = data.map((element) => (
//     <Alert
//       key={element.id}
//       data={data}
//       coordinates={element.geometry[element.geometry.length - 1].coordinates}
//     />
//   ));
//   return alertElements;
// }
