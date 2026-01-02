"use client";

import { Usuario } from "@/src/schemas";

export default function PerfilForm({ usuario }: { usuario: Usuario }) {
  return (
    <>
      <form className=" mt-14 space-y-5" noValidate>
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
