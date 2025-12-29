"use client";

import { crearPresupuesto } from "@/actions/crear-presupuesto-action";
import { useFormState } from "react-dom";
import MensajeError from "../ui/MensajeError";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CrearPresupuestoForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(crearPresupuesto, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push("/admin");
    }
  }, [state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}

      <div className="space-y-3">
        <label htmlFor="nombre" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="nombre"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del presupuesto"
          name="nombre"
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="cantidad" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="cantidad"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Cantidad del presupuesto"
          name="cantidad"
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  );
}
