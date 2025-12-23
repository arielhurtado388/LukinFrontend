"use server";

import {
  ErrorResponseSchema,
  RegistroSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function crearCuenta(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const registroData = {
    nombre: datosForm.get("nombre"),
    correo: datosForm.get("correo"),
    password: datosForm.get("password"),
    confirmacion_password: datosForm.get("confirmacion_password"),
  };
  //   Validar
  const registro = RegistroSchema.safeParse(registroData);

  if (!registro.success) {
    const errores = registro.error.issues.map((error) => error.message);
    return {
      errores,
      success: prevState.success,
    };
  }

  // Crear la cuenta
  const url = `${process.env.API_URL}/auth/crear-cuenta`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: registro.data.nombre,
      correo: registro.data.correo,
      password: registro.data.password,
    }),
  });

  const json = await req.json();

  if (req.status === 409) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errores: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
