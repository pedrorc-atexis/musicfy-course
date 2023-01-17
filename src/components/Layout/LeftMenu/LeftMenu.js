import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { NewAlbumForm } from "../../Album";
import { NewArtistForm } from "../../Artist";
import { NewSongForm } from "../../Song";
import { BasicModal } from "../../Shared";
import "./LeftMenu.scss";

export function LeftMenu() {
  const { pathname } = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("second");
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    switch (type) {
      case "artist":
        setModalTitle("Nuevo artista");
        setModalContent(<NewArtistForm onClose={closeModal} />);
        break;
      case "album":
        setModalTitle("Nuevo album");
        setModalContent(<NewAlbumForm onClose={closeModal} />);
        break;
      case "song":
        setModalTitle("Nueva cancion");
        setModalContent(<NewSongForm onClose={closeModal} />);
        break;
      default:
        break;
    }
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const isCurrentPage = (route) => {
    return route === pathname;
  };
  return (
    <>
      <div className="left-menu">
        <Menu secondary vertical fluid>
          <Menu.Item
            as={Link}
            to="/"
            name="Inicio"
            icon="home"
            active={isCurrentPage("/")}
          />
          <Menu.Item
            as={Link}
            to="/artists"
            name="Artistas"
            icon="users"
            active={isCurrentPage("/artists")}
          />
          <Menu.Item
            as={Link}
            to="/albums"
            name="Álbumes"
            icon="window maximize outline"
            active={isCurrentPage("/albums")}
          />
        </Menu>

        <Menu secondary vertical fluid>
          <Menu.Item
            link
            name="Nueva canción"
            icon="plus"
            onClick={() => {
              openModal("song");
            }}
          />
          <Menu.Item
            link
            name="Nuevo album"
            icon="plus"
            onClick={() => {
              openModal("album");
            }}
          />
          <Menu.Item
            link
            name="Nuevo artista"
            icon="plus"
            onClick={() => {
              openModal("artist");
            }}
          />
        </Menu>
      </div>
      <BasicModal
        show={showModal}
        onClose={closeModal}
        title={modalTitle}
        children={modalContent}
      />
    </>
  );
}
