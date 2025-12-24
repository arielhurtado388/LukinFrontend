import ConfirmarForm from "@/components/auth/ConfirmarForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lukin - Confirma tu cuenta",
  description: "Lukin - Confirma tu cuenta",
};

export default function ConfirmarPage() {
  return (
    <>
      <h1 className="font-black text-5xl text-purple-950">
        Confirma tu cuenta
      </h1>
      <p className="text-2xl font-bold">
        Ingresa el código que recibiste{" "}
        <span className="text-amber-500">en tu correo</span>
      </p>

      <ConfirmarForm />
    </>
  );
}
