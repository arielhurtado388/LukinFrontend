"use client";

import { crearPresupuesto } from "@/actions/crear-presupuesto-action";
import { useFormState } from "react-dom";
import MensajeError from "../ui/MensajeError";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PresupuestoForm from "./PresupuestoForm";

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
  }, [state, router]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}
      <PresupuestoForm />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  );
}
