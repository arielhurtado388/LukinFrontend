import AgregarGastoButton from "@/components/gastos/AgregarGastoButton";
import ModalContainer from "@/components/ui/ModalContainer";
import { obtenerPresupuesto } from "@/src/services/presupuestos";
import { Metadata } from "next";
import React from "react";

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
          <p>Si hay gastos</p>
        </>
      ) : (
        <p className="text-center py-20">No hay gastos aún</p>
      )}
      <ModalContainer />
    </>
  );
}
