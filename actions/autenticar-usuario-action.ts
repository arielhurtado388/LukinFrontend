"use server";

import { LoginSchema } from "@/src/schemas";

type ActionStateType = {
  errores: string[];
};

export async function autneticar(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const credenciales = {
    correo: datosForm.get("correo"),
    password: datosForm.get("password"),
  };

  const auth = LoginSchema.safeParse(credenciales);
  if (!auth.success) {
    return {
      errores: auth.error.issues.map((issue) => issue.message),
    };
  }
  return {
    errores: [],
  };
}
