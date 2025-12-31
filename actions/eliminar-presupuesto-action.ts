"use server";

import obtenerToken from "@/src/auth/token";
import {
  ErrorResponseSchema,
  PasswordSchema,
  Presupuesto,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function eliminarPresupuesto(
  idPresupuesto: Presupuesto["id"],
  prevState: ActionStateType,
  datosForm: FormData
) {
  const password = PasswordSchema.safeParse(datosForm.get("password"));

  if (!password.success) {
    return {
      errores: password.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = obtenerToken();

  //   Verificar password
  const urlPass = `${process.env.API_URL}/auth/verificar-password`;
  const reqPass = await fetch(urlPass, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: password.data,
    }),
  });

  const jsonPass = await reqPass.json();

  if (!reqPass.ok) {
    const { error } = ErrorResponseSchema.parse(jsonPass);
    return {
      errores: [error],
      success: "",
    };
  }

  //   Eliminar presupuesto
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errores: [error],
      success: "",
    };
  }
  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
