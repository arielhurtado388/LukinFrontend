import { DialogTitle } from "@headlessui/react";
import GastoForm from "./GastoForm";
import { useFormState } from "react-dom";
import agregarGasto from "@/actions/crear-gasto-action";
import { useParams } from "next/navigation";
import MensajeError from "../ui/MensajeError";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AgregarGastoForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { id } = useParams();
  const agregarGastoAPresupuesto = agregarGasto.bind(null, +id);
  const [state, dispatch] = useFormState(agregarGastoAPresupuesto, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <GastoForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
}
