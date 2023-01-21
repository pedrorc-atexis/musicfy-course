import React, { useEffect, useState } from "react";
import { Artist, Album, Song } from "../../api";
import { map, size } from "lodash";
import { Slider } from "../../components/Shared";
import { bannerHome } from "../../assets";
import "./Home.scss";

const artistController = new Artist();
const albumController = new Album();
const songController = new Song();

export function Home() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getLastArtist();
        setArtists(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getLastAlbums();
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (size(albums) !== 0) {
          const response = await songController.getLastSongs();
          setSongs(
            map(response, (song) => ({
              ...song,
              image: albums.find((album) => album.id === song.album).image,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [albums]);

  return (
    <div className="home-page">
      <div
        className="home-page__banner"
        style={{ backgroundImage: `url(${bannerHome})` }}
      />

      <div className="home-page__slider">
        <h2>Ultimos artistas</h2>
        {size(artists) !== 0 && <Slider data={artists} basePath={"artist"} />}
      </div>
      <div className="home-page__slider">
        <h2>Ultimos albumes</h2>
        {size(albums) !== 0 && <Slider data={albums} basePath={"album"} />}
      </div>
      <div className="home-page__slider">
        <h2>Ultimas canciones</h2>
        {size(songs) !== 0 && (
          <Slider data={songs} basePath={"song"} song={true} />
        )}
      </div>
    </div>
  );
}
