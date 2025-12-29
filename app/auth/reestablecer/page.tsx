import PasswordResetHandler from "@/components/auth/PasswordResetHandler";

export default function ReestablecerPage() {
  return (
    <>
      <h1 className="font-black text-5xl text-purple-950">
        Reestablecer Contraseña
      </h1>
      <p className="text-2xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por correo</span>
      </p>
      <PasswordResetHandler />
    </>
  );
}
