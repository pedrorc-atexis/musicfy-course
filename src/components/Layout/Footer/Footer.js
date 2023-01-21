import React, { useState } from "react";
import { Icon, Image, Input } from "semantic-ui-react";
import { Player } from "../../Shared";
import { usePlayer } from "../../../hooks";
import "./Footer.scss";

export function Footer() {
  const { song, miniature, volume, setVolume } = usePlayer();
  const [currentVolume, setCurrentVolume] = useState(volume);

  const toggleVolume = () => {
    volume ? setVolume(0) : setVolume(currentVolume);
  };
  return (
    <div className="footer">
      <div className="footer__left">
        {miniature && <Image src={miniature} />}
        {song && <span>{song.name}</span>}
      </div>
      <div className="footer__center">
        <Player />
      </div>
      <div className="footer__right">
        <Input
          value={volume}
          label={
            volume > 0 ? (
              volume > 0.3 ? (
                <Icon name="volume up" onClick={toggleVolume} />
              ) : (
                <Icon name="volume down" onClick={toggleVolume} />
              )
            ) : (
              <Icon name="volume off" onClick={toggleVolume} />
            )
          }
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={(_, data) => {
            setCurrentVolume(Number(data.value));
            setVolume(Number(data.value));
          }}
        />
      </div>
    </div>
  );
}
