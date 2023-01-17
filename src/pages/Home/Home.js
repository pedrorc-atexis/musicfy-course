import React from "react";
import { Button } from "semantic-ui-react";
import { Auth } from "../../api";

const auth = new Auth();

export function Home() {
  const logout = async () => {
    await auth.logout();
  };

  return (
    <div>
      <h1>Home Screen</h1>
      <Button primary onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
}
