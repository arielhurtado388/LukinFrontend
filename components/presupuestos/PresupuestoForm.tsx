import { Presupuesto } from "@/src/schemas";

export default function PresupuestoForm({
  presupuesto,
}: {
  presupuesto?: Presupuesto;
}) {
  return (
    <>
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
          defaultValue={presupuesto?.nombre}
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
          defaultValue={presupuesto?.cantidad}
        />
      </div>
    </>
  );
}
