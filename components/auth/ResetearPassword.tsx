export default function ResetearPasswordForm() {
  return (
    <form className=" mt-14 space-y-5" noValidate>
      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg" htmlFor="password">
          Contraseña
        </label>

        <input
          type="password"
          id="password"
          placeholder="Nueva contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg" htmlFor="confirmacion_password">
          Repetir nueva contraseña
        </label>

        <input
          id="confirmacion_password"
          type="password"
          placeholder="Repite la nueva contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="confirmacion_password"
        />
      </div>

      <input
        type="submit"
        value="Guardar Contraseña"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-lg cursor-pointer block"
      />
    </form>
  );
}
