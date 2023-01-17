import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    username: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Email invalido").required(true),
    password: Yup.string()
      .required(true)
      .min(6, "Debe tener 6 caracteres como minimo"),
    username: Yup.string().required(true),
  });
}
