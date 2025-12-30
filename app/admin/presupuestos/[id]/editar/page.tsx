import obtenerToken from "@/src/auth/token";
import { PresupuestoAPIResponseSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

const obtenerPresupuesto = async (idPresupuesto: string) => {
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${idPresupuesto}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    notFound();
  }

  const presupuesto = PresupuestoAPIResponseSchema.parse(json);

  return presupuesto;
};

export default async function EditarPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const presupuesto = await obtenerPresupuesto(id);
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Editar Presupuesto: {presupuesto.nombre}
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>
      <div className="p-10 mt-10  shadow-lg border "></div>
    </>
  );
}
