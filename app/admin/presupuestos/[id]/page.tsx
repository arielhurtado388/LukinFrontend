import AgregarGastoButton from "@/components/gastos/AgregarGastoButton";
import GastoMenu from "@/components/gastos/GastoMenu";
import ModalContainer from "@/components/ui/ModalContainer";
import { obtenerPresupuesto } from "@/src/services/presupuestos";
import { formatearFecha, formatearMoneda } from "@/src/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const presupuesto = await obtenerPresupuesto(params.id);
  return {
    title: `Lukin - ${presupuesto.nombre}`,
    description: `Lukin - ${presupuesto.nombre}`,
  };
}

export default async function DetallesPresupuestoPage({
  params,
}: {
  params: { id: string };
}) {
  const presupuesto = await obtenerPresupuesto(params.id);
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">
            {presupuesto.nombre}
          </h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AgregarGastoButton />
      </div>

      {presupuesto.gastos.length ? (
        <>
          <h1 className="font-black text-3xl text-purple-950 mt-10">
            Tus gastos
          </h1>

          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {presupuesto.gastos.map((gasto) => (
              <li key={gasto.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {gasto.nombre}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatearMoneda(+gasto.cantidad)}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Agregado:{" "}
                      <span className="font-bold">
                        {formatearFecha(gasto.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <GastoMenu idGasto={gasto.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center py-20">No hay gastos aún</p>
      )}
      <ModalContainer />
    </>
  );
}
