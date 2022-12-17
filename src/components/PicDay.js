import React from "react";

export default function PicDay() {
  const [response, setResponse] = React.useState(null);
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  async function getAPOD() {
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      );
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getAPOD();
  }, []);

  if (!response) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pic-day-container">
      <h1 className="pic-day-title">
        {response.title} ({response.date})
      </h1>
      <div className="pic-day-exp-img">
        <p className="pic-day-exp">{response.explanation}</p>
        <img className="pic-day-img" src={response.url} alt={response.title} />
      </div>
      <div className="pic-day-link ">
        <a
          className="go-to"
          rel="noreferrer"
          target="_blank"
          href={response.url}
        >
          See full image
        </a>
      </div>
    </div>
  );

  // return <div>Hello</div>
}
