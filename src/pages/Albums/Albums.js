import React, { useEffect, useState } from "react";
import { Album } from "../../api";
import { ListAlbum } from "../../components/Album";
import "./Albums.scss";

const albumController = new Album();

export function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.readAll();
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="albums-page">
      <h1>Álbumes</h1>
      <ListAlbum albums={albums} />
    </div>
  );
}
