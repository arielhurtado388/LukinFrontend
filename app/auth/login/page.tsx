import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lukin - Iniciar Sesión",
  description: "Lukin - Iniciar Sesión",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-5xl text-purple-950">Iniciar Sesión</h1>
      <p className="text-2xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-center text-gray-500" href="/auth/registro">
          ¿No tienes cuenta? Crea una
        </Link>
        <Link className="text-center text-gray-500" href="/auth/olvide">
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
}
