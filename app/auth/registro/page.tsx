import RegistroForm from "@/components/auth/RegistroForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lukin - Crear Cuenta",
  description: "Lukin - Crear Cuenta",
};

export default function RegistroPage() {
  return (
    <>
      <h1 className="font-black text-5xl text-purple-950">Crea una cuenta</h1>
      <p className="text-2xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <RegistroForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-center text-gray-500" href="/auth/login">
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
        <Link className="text-center text-gray-500" href="/auth/olvide">
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
}
