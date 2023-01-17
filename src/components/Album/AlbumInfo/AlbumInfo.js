import React, { useEffect, useState } from "react";
import { Image, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Artist } from "../../../api";
import "./AlbumInfo.scss";

const artistController = new Artist();

export function AlbumInfo({ album: { name, image, artist: artistId } }) {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.read(artistId);
        setArtist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [artistId]);

  return (
    <div className="album-info">
      <Image src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        {!artist && <Loader active inline="centered" size="large" />}
        {artist && (
          <p>
            De <Link to={`/artist/${artistId}`}>{artist.name}</Link>
          </p>
        )}
      </div>
    </div>
  );
}
