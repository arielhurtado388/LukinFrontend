import { z } from "zod";

// Revisa envios

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

export const TokenSchema = z.string().length(6, "El código no es válido");

export const LoginSchema = z.object({
  correo: z.email("El correo no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const ForgotPasswordSchema = z.object({
  correo: z.email("El correo no es válido"),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmacion_password: z.string(),
  })
  .refine((data) => data.password === data.confirmacion_password, {
    message: "Las contraseñas no son iguales",
    path: ["confirmacion_password"],
  });

export const DraftPresupuestoSchema = z.object({
  nombre: z.string().min(1, "El nombre del presupuesto es obligatorio"),
  cantidad: z.coerce
    .number("La cantidad no es válida")
    .min(1, "La cantidad no es válida"),
});

export const PasswordSchema = z.string().min(1, "La contraseña es obligatoria");

export const DraftGastoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cantidad: z.coerce.number().min(1, "La cantidad no es válida"),
});

// Revisa respuestas
export const SuccessSchema = z.string();

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const UsuarioSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  correo: z.email(),
});

export const GastoAPIResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  cantidad: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  idPresupuesto: z.number(),
});

export const PresupuestoAPIResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  cantidad: z.string(),
  idUsuario: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  gastos: z.array(GastoAPIResponseSchema),
});

export const PresupuestosAPIResponseSchema = z.array(
  PresupuestoAPIResponseSchema
);

// Types
export type Usuario = z.infer<typeof UsuarioSchema>;

export type Presupuesto = z.infer<typeof PresupuestoAPIResponseSchema>;
