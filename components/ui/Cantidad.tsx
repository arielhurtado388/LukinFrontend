import { formatearMoneda } from "@/src/utils";

type CantidadProps = {
  titulo: string;
  cantidad: number;
};

export default function Cantidad({ titulo, cantidad }: CantidadProps) {
  return (
    <p className="text-2xl font-bold ">
      {titulo}:{" "}
      <span className="text-amber-500">{formatearMoneda(cantidad)}</span>
    </p>
  );
}
