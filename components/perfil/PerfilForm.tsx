"use client";

import { actualizarPerfil } from "@/actions/actualizar-perfil-action";
import { Usuario } from "@/src/schemas";
import { useFormState } from "react-dom";
import MensajeError from "../ui/MensajeError";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function PerfilForm({ usuario }: { usuario: Usuario }) {
  const [state, dispatch] = useFormState(actualizarPerfil, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}
      <form className=" mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-lg" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="nombre"
            defaultValue={usuario.nombre}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-lg" htmlFor="correo">
            Correo
          </label>

          <input
            id="correo"
            type="email"
            placeholder="Tu correo"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="correo"
            defaultValue={usuario.correo}
          />
        </div>

        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-lg cursor-pointer"
        />
      </form>
    </>
  );
}
