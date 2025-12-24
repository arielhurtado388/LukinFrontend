import { z } from "zod";

export const RegistroSchema = z
  .object({
    nombre: z
      .string()
      .min(3, "El nombre debe tener mínimo 3 caracteres")
      .max(60, "El nombre debe tener máximo 60 caracteres")
      .trim(),
    correo: z.email("El correo no es válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .trim(),
    confirmacion_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmacion_password, {
    message: "Las contraseñas no son iguales",
    path: ["confirmacion_password"],
  });

export const SuccessSchema = z.string();

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const TokenSchema = z.string().length(6, "El código no es válido");
