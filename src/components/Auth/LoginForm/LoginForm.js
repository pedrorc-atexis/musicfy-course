import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../api";
import { initialValues, validationSchema } from "./LoginForm.data";
import "./LoginForm.scss";

const auth = new Auth();

export function LoginForm({ openForm }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await auth.login(formValue.email, formValue.password);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="login-form">
      <h1>Musica para todos</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          icon="mail outline"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={toggleShowPassword}
            />
          }
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Iniciar sesión
        </Form.Button>
      </Form>
      <div className="login-form__options">
        <p
          onClick={() => {
            openForm(null);
          }}
        >
          Volver
        </p>
        <p>
          ¿No tienes Musicfy?
          <span
            onClick={() => {
              openForm("register");
            }}
          >
            Registrate
          </span>
        </p>
      </div>
    </div>
  );
}
