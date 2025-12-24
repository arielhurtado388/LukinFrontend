"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};
export async function confirmarCuenta(
  token: string,
  prevState: ActionStateType
) {
  const tokenConfirmacion = TokenSchema.safeParse(token);

  if (!tokenConfirmacion.success) {
    return {
      errores: tokenConfirmacion.error.issues.map((error) => error.message),
      success: "",
    };
  }

  // Confirmar la cuenta
  const url = `${process.env.API_URL}/auth/confirmar-cuenta`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: tokenConfirmacion.data,
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
