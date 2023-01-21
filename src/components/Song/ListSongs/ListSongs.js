import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { size, map } from "lodash";
import { usePlayer } from "../../../hooks";
import "./ListSongs.scss";

export function ListSongs({ songs, miniature }) {
  const { playSong } = usePlayer();
  if (size(songs) === 0) {
    return <p className="no-songs">Este album aun no tiene canciones</p>;
  }
  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(songs, (song) => (
          <Table.Row key={song.id} onClick={() => playSong(song, miniature)}>
            <Table.Cell collapsing>
              <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>{song.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
