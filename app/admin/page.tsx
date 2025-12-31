import EliminarPresupuestoModal from "@/components/presupuestos/EliminarPresupuestoModal";
import PresupuestoMenu from "@/components/presupuestos/PresupuestoMenu";
import obtenerToken from "@/src/auth/token";
import { PresupuestosAPIResponseSchema } from "@/src/schemas";
import { formatearFecha, formatearMoneda } from "@/src/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lukin - Panel de administración",
  description: "Lukin - Panel de administración",
};

async function obtenerPresupuestos() {
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  const presupuestos = PresupuestosAPIResponseSchema.parse(json);
  return presupuestos;
}

export default async function AdminPage() {
  const presupuestos = await obtenerPresupuestos();
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold">
            Maneja y administra tus {""}
            <span className="text-amber-500">presupuestos</span>
          </p>
        </div>
        <Link
          href={"/admin/presupuestos/nuevo"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>

      {presupuestos.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {presupuestos.map((presupuesto) => (
              <li
                key={presupuesto.id}
                className="flex justify-between gap-x-6 p-5 "
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        className="cursor-pointer hover:underline text-xl font-bold"
                        href={`/admin/presupuestos/${presupuesto.id}`}
                      >
                        {presupuesto.nombre}
                      </Link>
                    </p>
                    <p className="text-lg font-bold text-amber-500">
                      {formatearMoneda(+presupuesto.cantidad)}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Última actualización:{" "}
                      <span className="font-bold">
                        {formatearFecha(presupuesto.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <PresupuestoMenu idPresupuesto={presupuesto.id} />
                </div>
              </li>
            ))}
          </ul>
          <EliminarPresupuestoModal />
        </>
      ) : (
        <p className="text-center py-20">
          No tienes presupuestos aún
          <Link
            className="text-purple-950 font-bold"
            href={"/admin/presupuestos/nuevo"}
          >
            , comienza creando uno
          </Link>
        </p>
      )}
    </>
  );
}
