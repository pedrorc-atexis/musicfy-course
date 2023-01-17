import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Album as AlbumController } from "../../api";
import { AlbumInfo } from "../../components/Album";
import "./Album.scss";

const albumController = new AlbumController();

export function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await albumController.read(id);
      setAlbum(response);
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
    </div>
  );
}
