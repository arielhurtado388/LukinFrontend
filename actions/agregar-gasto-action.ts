"use server";

import obtenerToken from "@/src/auth/token";
import {
  DraftGastoSchema,
  ErrorResponseSchema,
  Presupuesto,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export default async function agregarGasto(
  idPresupuesto: Presupuesto["id"],
  prevState: ActionStateType,
  datosForm: FormData
) {
  const gastoData = {
    nombre: datosForm.get("nombre"),
    cantidad: datosForm.get("cantidad"),
  };

  const gasto = DraftGastoSchema.safeParse(gastoData);

  if (!gasto.success) {
    return {
      errores: gasto.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}/gastos`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: gasto.data.nombre,
      cantidad: gasto.data.cantidad,
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
