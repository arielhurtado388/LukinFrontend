"use server";

import obtenerToken from "@/src/auth/token";
import { DraftPresupuestoSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

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

  const token = obtenerToken();

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

  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
