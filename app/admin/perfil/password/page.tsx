import CambiarPasswordForm from "@/components/perfil/CambiarPasswordForm";

export default async function CambiarPasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950 my-5">
        Cambiar Contraseña
      </h1>
      <p className="text-xl font-bold">
        Aquí puedes cambiar tu {""}
        <span className="text-amber-500">contraseña</span>
      </p>
      <CambiarPasswordForm />
    </>
  );
}
