import { verificarSesion } from "@/src/auth/dal";
import obtenerToken from "@/src/auth/token";

export async function GET(
  request: Request,
  { params }: { params: { idPresupuesto: string; idGasto: string } }
) {
  await verificarSesion();
  const token = obtenerToken();
  const url = `${process.env.API_URL}/presupuestos/${params.idPresupuesto}/gastos/${params.idGasto}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    return Response.json(json.error, { status: 403 });
  }

  return Response.json(json);
}
