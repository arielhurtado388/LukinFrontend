import { validarToken } from "@/actions/validar-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ValidarTokenFormProps = {
  setEsValido: Dispatch<SetStateAction<boolean>>;
};

export default function ValidarTokenForm({
  setEsValido,
}: ValidarTokenFormProps) {
  const [token, setToken] = useState("");
  const [estaCompleto, SetEstaCompleto] = useState(false);

  const validarTokenInput = validarToken.bind(null, token);

  const [state, dispath] = useFormState(validarTokenInput, {
    errores: [],
    success: "",
  });

  useEffect(() => {
    if (state.errores) {
      state.errores.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      setEsValido(true);
    }
  }, [state]);

  useEffect(() => {
    if (estaCompleto) {
      dispath();
    }
  }, [estaCompleto]);

  const handleChange = (token: string) => {
    SetEstaCompleto(false);
    setToken(token);
  };

  const handleComplete = () => {
    SetEstaCompleto(true);
  };

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  );
}
