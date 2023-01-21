import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { Artist as ArtistController, Album, Song } from "../../api";
import { useParams } from "react-router-dom";
import { ArtistBanner } from "../../components/Artist";
import { Slider } from "../../components/Shared";
import "./Artist.scss";
import { map } from "lodash";

const artistsController = new ArtistController();
const albumController = new Album();
const songController = new Song();

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
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

  useEffect(() => {
    if (albums) {
      (async () => {
        try {
          const data = [];

          for await (const item of albums) {
            const result = await songController.readAllByAlbum(item.id);
            const dataTemp = map(result, (songData) => ({
              ...songData,
              image: item.image,
            }));
            data.push(...dataTemp);
          }
          setSongs(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [albums]);

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
        <Slider data={songs} basePath="song" song={true} />
      </div>
    </div>
  );
}
