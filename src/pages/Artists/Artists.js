import React, { useEffect, useState } from "react";
import { Artist } from "../../api";
import { ListArtist } from "../../components/Artist";
import "./Artists.scss";

const artistController = new Artist();

export function Artists() {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.readAll();
        setArtists(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="artists-page">
      <h1>Artistas</h1>
      <ListArtist artists={artists} />
    </div>
  );
}
