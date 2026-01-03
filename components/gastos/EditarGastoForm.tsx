import { DialogTitle } from "@headlessui/react";
import GastoForm from "./GastoForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftGasto } from "@/src/schemas";
import { useFormState } from "react-dom";
import editarGasto from "@/actions/editar-gasto-action";
import MensajeError from "../ui/MensajeError";
import { toast } from "react-toastify";

export default function EditarGastoForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [gasto, setGasto] = useState<DraftGasto>();
  const { id: idPresupuesto } = useParams();

  const searchParams = useSearchParams();
  const idGasto = searchParams.get("idEditarGasto")!;

  const editarGastoId = editarGasto.bind(null, {
    idPresupuesto: +idPresupuesto,
    idGasto: +idGasto,
  });

  const [state, dispatch] = useFormState(editarGastoId, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/presupuestos/${idPresupuesto}/gastos/${idGasto}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGasto(data));
  }, [idGasto, idPresupuesto]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
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
        <GastoForm gasto={gasto} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
