import React from "react";
import "./ArtistBanner.scss";

export function ArtistBanner({ name, image }) {
  return (
    <div className="artist-banner">
      <div
        className="artist-banner__image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span>Artista</span>
        <h1>{name}</h1>
      </div>

      <div className="artist-banner__gradient" />
    </div>
  );
}
