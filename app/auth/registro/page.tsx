import RegistroForm from "@/components/auth/RegistroForm";
import type { Metadata } from "next";

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
    </>
  );
}
