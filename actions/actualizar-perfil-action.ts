"use server";

import obtenerToken from "@/src/auth/token";
import {
  ActualizarPerfilSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function actualizarPerfil(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const usuarioData = {
    nombre: datosForm.get("nombre"),
    correo: datosForm.get("correo"),
  };

  const usuario = ActualizarPerfilSchema.safeParse(usuarioData);

  if (!usuario.success) {
    return {
      errores: usuario.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = obtenerToken();
  const url = `${process.env.API_URL}/auth/actualizar-perfil`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: usuario.data.nombre,
      correo: usuario.data.correo,
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
  revalidatePath("/admin/perfil/configuracion");
  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
