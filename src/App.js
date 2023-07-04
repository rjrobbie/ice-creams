import './App.css';
import React, { useState, useEffect, useRef } from 'react';

const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4";
const utm = "?utm_source=scrimba_degree&utm_medium=referral";

const loadData = (options) => {
  fetch(options.url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
       if (options.onSuccess) options.onSuccess(data);
    });
};

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("ice-cream");
  const queryInput = useRef(null);

  const numberOfPhotos = 20;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;

    loadData({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res);
      }
    });
  }, [query, url]);

  const searchPhotos = e => {
    e.preventDefault();
    setQuery(queryInput.current.value);
  };

  return (
    <div className="box">
      <h2>🍨</h2>
      <h1>Robbie's Ice Cream Shop</h1>
      <div className="grid">
      { query &&
          photos.map(photo => {
          return (
            <div key={photo.id} className="item">
              <img
                className="img"
                src={photo.urls.regular}
                alt="Unsplash Photo"
              />
              <div className="caption">
                <span className="credits">Photo by 
                  <a href={photo.user.links.html + utm}>   {photo.user.name} 
                  </a>
                  <span> on </span> 
                  <a href={"https://unsplash.com" + utm}>
                    Unsplash
                  </a>
                </span>
              </div>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default App;
