"use client";

export default function RegistroForm() {
  return (
    <form className="mt-14 space-y-5" noValidate>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-lg" htmlFor="correo">
          Correo
        </label>
        <input
          id="correo"
          type="email"
          placeholder="Tu correo"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="correo"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-lg">Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="nombre"
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

      <div className="flex flex-col gap-2">
        <label className="font-bold text-lg">Repetir contraseña</label>
        <input
          id="confirmacion_password"
          type="password"
          placeholder="Repite tu contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="confirmacion_password"
        />
      </div>

      <input
        type="submit"
        value="Crear Cuenta"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-lg cursor-pointer block"
      />
    </form>
  );
}
