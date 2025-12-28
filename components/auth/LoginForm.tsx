"use client";

import { autneticar } from "@/actions/autenticar-usuario-action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [state, dispatch] = useFormState(autneticar, {
    errores: [],
  });

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);
  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Correo</label>

          <input
            id="correo"
            type="email"
            placeholder="Tu correo"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="correo"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Contraseña</label>

          <input
            type="password"
            placeholder="Tu contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-lg cursor-pointer"
        />
      </form>
    </>
  );
}
