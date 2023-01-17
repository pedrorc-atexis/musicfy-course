import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import { AuthOptions, LoginForm, RegisterForm } from "../../components/Auth";
import { logoNameWhite } from "../../assets";
import "./Auth.scss";

export function Auth() {
  const [typeForm, setTypeForm] = useState("login-");

  const openForm = (form) => setTypeForm(form);

  const renderForm = () => {
    switch (typeForm) {
      case "login":
        return <LoginForm openForm={openForm} />;
      case "register":
        return <RegisterForm openForm={openForm} />;
      default:
        return <AuthOptions openForm={openForm} />;
    }
  };

  return (
    <div className="auth">
      <div className="auth__content">
        <Image
          src={logoNameWhite}
          alt="Musicfy"
          className="auth__content-logo"
        />
        {renderForm()}
      </div>
    </div>
  );
}
