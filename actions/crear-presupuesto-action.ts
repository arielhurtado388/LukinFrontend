"use server";

import {
  DraftPresupuestoSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function crearPresupuesto(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const presupuesto = DraftPresupuestoSchema.safeParse({
    nombre: datosForm.get("nombre"),
    cantidad: datosForm.get("cantidad"),
  });
  if (!presupuesto.success) {
    return {
      errores: presupuesto.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = cookies().get("LUKIN_TOKEN")?.value;

  const url = `${process.env.API_URL}/presupuestos`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: presupuesto.data.nombre,
      cantidad: presupuesto.data.cantidad,
    }),
  });

  const json = await req.json();

  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
