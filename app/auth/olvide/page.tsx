import OlvideForm from "@/components/auth/OlvideForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lukin - Olvidé mi contraseña",
  description: "Lukin - Olvidé mi contraseña",
};

export default function OlvidePage() {
  return (
    <>
      <h1 className="font-black text-5xl text-purple-950">
        ¿Olvidaste tu contraseña?
      </h1>
      <p className="text-2xl font-bold">
        aquí puedes <span className="text-amber-500">reestablecerla</span>
      </p>

      <OlvideForm />
    </>
  );
}
