import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import {
  AvatarUpdate,
  DisplayNameUpdateForm,
  EmailUpdateForm,
  PasswordUpdateForm,
} from "../../components/Profile";
import { BasicModal } from "../../components/Shared";
import { User } from "../../api";

import "./Profile.scss";

const user = new User();

export function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const onCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalContent(null);
  };

  const openForm = (type) => {
    switch (type) {
      case "displayName":
        setShowModal(true);
        setModalTitle("Actualizar nombre y apellido");
        setModalContent(<DisplayNameUpdateForm onClose={onCloseModal} />);
        break;
      case "email":
        setShowModal(true);
        setModalTitle("Actualizar email");
        setModalContent(<EmailUpdateForm onClose={onCloseModal} />);
        break;
      case "password":
        setShowModal(true);
        setModalTitle("Actualizar contraseña");
        setModalContent(<PasswordUpdateForm onClose={onCloseModal} />);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const { displayName, email } = user.getMe();

  return (
    <>
      <div className="profile">
        <h1>Configuración</h1>
        <div className="profile__block">
          <div>
            <AvatarUpdate />
            <span>{displayName}</span>
          </div>
          <Button
            onClick={() => {
              openForm("displayName");
            }}
          >
            Actualizar
          </Button>
        </div>
        <div className="profile__block">
          <span>Email: {email}</span>
          <Button
            onClick={() => {
              openForm("email");
            }}
          >
            Actualizar
          </Button>
        </div>
        <div className="profile__block">
          <span>Contraseña: *** *** *** ***</span>
          <Button
            onClick={() => {
              openForm("password");
            }}
          >
            Actualizar
          </Button>
        </div>
      </div>
      <BasicModal
        show={showModal}
        onClose={onCloseModal}
        title={modalTitle}
        children={modalContent}
      />
    </>
  );
}
