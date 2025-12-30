import { notFound } from "next/navigation";
import obtenerToken from "../auth/token";
import { cache } from "react";
import { PresupuestoAPIResponseSchema } from "../schemas";

export const obtenerPresupuesto = cache(async (idPresupuesto: string) => {
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    notFound();
  }

  const presupuesto = PresupuestoAPIResponseSchema.parse(json);

  return presupuesto;
});
