"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function validarToken(token: string, prevState: ActionStateType) {
  const resetearPasswordToken = TokenSchema.safeParse(token);

  if (!resetearPasswordToken.success) {
    return {
      errores: resetearPasswordToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const url = `${process.env.API_URL}/auth/validar-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: resetearPasswordToken.data,
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
