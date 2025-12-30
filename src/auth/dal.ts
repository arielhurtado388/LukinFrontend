import "server-only";

import { redirect } from "next/navigation";
import { UsuarioSchema } from "../schemas";
import { cache } from "react";
import obtenerToken from "./token";

export const verificarSesion = cache(async () => {
  const token = obtenerToken();
  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/usuario`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const sesion = await req.json();
  const resultado = UsuarioSchema.safeParse(sesion);

  if (!resultado.success) {
    redirect("/auth/login");
  }

  return {
    usuario: resultado.data,
    isAuth: true,
  };
});
