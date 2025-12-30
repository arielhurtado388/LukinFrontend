"use server";

import obtenerToken from "@/src/auth/token";
import {
  DraftPresupuestoSchema,
  ErrorResponseSchema,
  Presupuesto,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function editarPresupuesto(
  idPresupuesto: Presupuesto["id"],
  prevState: ActionStateType,
  datosForm: FormData
) {
  const presupuestoData = {
    nombre: datosForm.get("nombre"),
    cantidad: datosForm.get("cantidad"),
  };

  const presupuesto = DraftPresupuestoSchema.safeParse(presupuestoData);

  if (!presupuesto.success) {
    return {
      errores: presupuesto.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}`;
  const req = await fetch(url, {
    method: "PUT",
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
