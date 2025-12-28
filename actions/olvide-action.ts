"use server";

import {
  ErrorResponseSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errores: string[];
  success: string;
};

export async function olvidePassword(
  prevState: ActionStateType,
  datosForm: FormData
) {
  const olvidePassword = ForgotPasswordSchema.safeParse({
    correo: datosForm.get("correo"),
  });

  if (!olvidePassword.success) {
    return {
      errores: olvidePassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/reestablecer-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: olvidePassword.data.correo,
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
