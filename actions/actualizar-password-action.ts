"use server";

import obtenerToken from "@/src/auth/token";
import {
  ActualizarPasswordSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function actualizarPassword(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const passwordData = {
    password: datosForm.get("password"),
    nuevo_password: datosForm.get("nuevo_password"),
    confirmacion_nuevo_password: datosForm.get("confirmacion_nuevo_password"),
  };

  const password = ActualizarPasswordSchema.safeParse(passwordData);

  if (!password.success) {
    return {
      errores: password.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const token = obtenerToken();
  const url = `${process.env.API_URL}/auth/actualizar-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: password.data.password,
      nuevo_password: password.data.nuevo_password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
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
