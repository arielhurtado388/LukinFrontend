"use client";

import { useRouter } from "next/navigation";

export default function AgregarGastoButton() {
  const router = useRouter();
  return (
    <button
      className="bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
      type="button"
      onClick={() =>
        router.push(location.pathname + "?agregarGasto=true&mostrarModal=true")
      }
    >
      Agregar Gasto
    </button>
  );
}
