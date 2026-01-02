import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import eliminarGasto from "@/actions/eliminar-gasto-action";
import { useEffect } from "react";
import MensajeError from "../ui/MensajeError";
import { toast } from "react-toastify";

type EliminarGastoFormProps = {
  closeModal: () => void;
};

export default function EliminarGastoForm({
  closeModal,
}: EliminarGastoFormProps) {
  const { id: idPresupuesto } = useParams();
  const searchParams = useSearchParams();
  const idGasto = searchParams.get("idEliminarGasto")!;

  const eliminarGastoId = eliminarGasto.bind(null, {
    idPresupuesto: +idPresupuesto,
    idGasto: +idGasto,
  });

  const [state, dispatch] = useFormState(eliminarGastoId, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (!Number.isInteger(+idPresupuesto) || !Number.isInteger(+idGasto)) {
      closeModal();
    }
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Gasto
      </DialogTitle>
      {state.errores.map((error) => (
        <MensajeError key={error}>{error}</MensajeError>
      ))}
      <p className="text-xl font-bold">
        Confirma para eliminar {""}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={() => dispatch()}
        >
          Eliminar
        </button>
      </div>
    </>
  );
}
