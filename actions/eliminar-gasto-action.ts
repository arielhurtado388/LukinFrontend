"use server";

import obtenerToken from "@/src/auth/token";
import {
  ErrorResponseSchema,
  Gasto,
  Presupuesto,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errores: string[];
  success: string;
};

type PresupuestoYGastoType = {
  idPresupuesto: Presupuesto["id"];
  idGasto: Gasto["id"];
};

export default async function eliminarGasto(
  { idPresupuesto, idGasto }: PresupuestoYGastoType,
  prevState: ActionStateType
) {
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}/gastos/${idGasto}`;
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
  revalidatePath(`/admin/presupuestos/${idPresupuesto}`);
  const success = SuccessSchema.parse(json);

  return {
    errores: [],
    success,
  };
}
