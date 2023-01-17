import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { Artist as ArtistController, Album } from "../../api";
import { useParams } from "react-router-dom";
import { ArtistBanner } from "../../components/Artist";
import { Slider } from "../../components/Shared";
import "./Artist.scss";

const artistsController = new ArtistController();
const albumController = new Album();

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await artistsController.read(id);
        setArtist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getAlbumsByArtist(id);
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!artist) {
    return (
      <Loader active inline="centered" size="large">
        Cargando...
      </Loader>
    );
  }

  return (
    <div className="artist-page">
      <ArtistBanner image={artist.image} name={artist.name} />
      <div className="artist-page__slider">
        <h2>Albumes</h2>
        <Slider data={albums} basePath="album" />
      </div>
      <div className="artist-page__slider">
        <h2>Canciones</h2>
      </div>
    </div>
  );
}
