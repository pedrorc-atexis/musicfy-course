import React from "react";
import { Button } from "semantic-ui-react";
import "./AuthOptions.scss";

export function AuthOptions({ openForm }) {
  return (
    <div className="auth-options">
      <h1>Millones de canciones gratis en Musicfy</h1>
      <Button className="register" onClick={() => openForm("register")}>
        Registrate gratis
      </Button>
      <Button className="login" onClick={() => openForm("login")}>
        Inicia sesión
      </Button>
    </div>
  );
}
