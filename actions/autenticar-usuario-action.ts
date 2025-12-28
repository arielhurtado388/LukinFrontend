"use server";

import { cookies } from "next/headers";
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";

type ActionStateType = {
  errores: string[];
};

export async function autneticar(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const credenciales = {
    correo: datosForm.get("correo"),
    password: datosForm.get("password"),
  };

  const auth = LoginSchema.safeParse(credenciales);
  if (!auth.success) {
    return {
      errores: auth.error.issues.map((issue) => issue.message),
    };
  }

  const url = `${process.env.API_URL}/auth/iniciar-sesion`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: auth.data.correo,
      password: auth.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errores: [error],
    };
  }

  // Setear cookies
  cookies().set({
    name: "LUKIN_TOKEN",
    value: json,
    httpOnly: true,
    path: "/",
  });

  return {
    errores: [],
  };
}
