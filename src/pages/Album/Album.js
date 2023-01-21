import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Album as AlbumController, Song } from "../../api";
import { AlbumInfo } from "../../components/Album";
import { ListSongs } from "../../components/Song";
import "./Album.scss";

const albumController = new AlbumController();
const songController = new Song();

export function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await albumController.read(id);
      setAlbum(response);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await songController.readAllByAlbum(id);
        setSongs(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!album) {
    return (
      <Loader active inline="centered" size="large">
        Cargando...
      </Loader>
    );
  }
  return (
    <div className="album-page">
      <h1>Album Screen</h1>
      <AlbumInfo album={album} />
      <ListSongs songs={songs} miniature={album.image} />
    </div>
  );
}
