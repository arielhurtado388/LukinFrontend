"use client";

import { confirmarCuenta } from "@/actions/confirmar-cuenta-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ConfirmarForm() {
  const router = useRouter();
  const [estaCompleto, setEstaCompleto] = useState(false);
  const [token, setToken] = useState("");

  const confirmarCuentaConToken = confirmarCuenta.bind(null, token); // Pasar argumentos adicionales al action

  const [state, dispatch] = useFormState(confirmarCuentaConToken, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (estaCompleto) {
      dispatch();
    }
  }, [estaCompleto]);

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  const handleChange = (token: string) => {
    setEstaCompleto(false);
    setToken(token);
  };

  const handleComplete = () => {
    setEstaCompleto(true);
  };

  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        </PinInput>
      </div>
    </>
  );
}
