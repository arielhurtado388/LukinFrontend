"use client";

export default function OlvideForm() {
  return (
    <form className=" mt-14 space-y-5" noValidate>
      <div className="flex flex-col gap-2 mb-10">
        <label className="font-bold text-lg">Correo</label>

        <input
          type="email"
          placeholder="Tu correo"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="correo"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-lg cursor-pointer "
      />
    </form>
  );
}
