"use server";

import {
  ErrorResponseSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function resetearPassword(
  token: string,
  prevState: ActionStateType,
  datosForm: FormData
) {
  const resetearPasswordInput = {
    password: datosForm.get("password"),
    confirmacion_password: datosForm.get("confirmacion_password"),
  };

  const resetearPassword = ResetPasswordSchema.safeParse(resetearPasswordInput);

  if (!resetearPassword.success) {
    return {
      errores: resetearPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/resetear-password/${token}`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetearPassword.data.password,
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
