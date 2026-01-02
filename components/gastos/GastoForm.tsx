import { DraftGasto } from "@/src/schemas";

type GastoFormProps = {
  gasto?: DraftGasto;
};

export default function GastoForm({ gasto }: GastoFormProps) {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="nombre" className="text-sm uppercase font-bold">
          Nombre Gasto
        </label>
        <input
          id="nombre"
          className="w-full p-3  border border-gray-100  bg-white"
          type="text"
          placeholder="Nombre del gasto"
          name="nombre"
          defaultValue={gasto?.nombre}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="cantidad" className="text-sm uppercase font-bold">
          Cantidad Gasto
        </label>
        <input
          id="cantidad"
          className="w-full p-3  border border-gray-100 bg-white"
          type="number"
          placeholder="Cantidad del gasto"
          name="cantidad"
          defaultValue={gasto?.cantidad}
        />
      </div>
    </>
  );
}
