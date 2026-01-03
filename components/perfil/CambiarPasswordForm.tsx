"use client";

import { actualizarPassword } from "@/actions/actualizar-password-action";
import { useFormState } from "react-dom";
import MensajeError from "../ui/MensajeError";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function CambiarPasswordForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(actualizarPassword, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      ref.current?.reset();
    }
  }, [state]);

  return (
    <>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}
      <form className=" mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-lg" htmlFor="password">
            Contraseña Actual
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tu contraseña actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-lg" htmlFor="nuevo_password">
            Nueva Contraseña
          </label>
          <input
            id="nuevo_password"
            type="password"
            placeholder="Tu nueva contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="nuevo_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="confirmacion_nuevo_password"
            className="font-bold text-lg"
          >
            Repetir Contraseña
          </label>

          <input
            id="confirmacion_nuevo_password"
            type="password"
            placeholder="Repite tu nueva contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="confirmacion_nuevo_password"
          />
        </div>

        <input
          type="submit"
          value="Cambiar Contraseña"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-lg cursor-pointer"
        />
      </form>
    </>
  );
}
