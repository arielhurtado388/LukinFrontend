"use client";

import { olvidePassword } from "@/actions/olvide-action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function OlvideForm() {
  const [state, dispatch] = useFormState(olvidePassword, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
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
