"use server";

import obtenerToken from "@/src/auth/token";
import {
  DraftGastoSchema,
  ErrorResponseSchema,
  Gasto,
  Presupuesto,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type PresupuestoYGastoType = {
  idPresupuesto: Presupuesto["id"];
  idGasto: Gasto["id"];
};

type ActionStateType = {
  errores: string[];
  success: string;
};

export default async function editarGasto(
  { idPresupuesto, idGasto }: PresupuestoYGastoType,
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
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}/gastos/${idGasto}`;
  const req = await fetch(url, {
    method: "PUT",
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
  revalidatePath(`/admin/presupuestos/${idPresupuesto}`);
  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
