import { resetearPassword } from "@/actions/resetear-password-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ResetearPasswordFormProps = {
  token: string;
};

export default function ResetearPasswordForm({
  token,
}: ResetearPasswordFormProps) {
  const router = useRouter();
  const resetearPasswordConToken = resetearPassword.bind(null, token);

  const [state, dispatch] = useFormState(resetearPasswordConToken, {
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
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
        onClick: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg" htmlFor="password">
          Contraseña
        </label>

        <input
          type="password"
          id="password"
          placeholder="Nueva contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg" htmlFor="confirmacion_password">
          Repetir nueva contraseña
        </label>

        <input
          id="confirmacion_password"
          type="password"
          placeholder="Repite la nueva contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="confirmacion_password"
        />
      </div>

      <input
        type="submit"
        value="Guardar Contraseña"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-lg cursor-pointer block"
      />
    </form>
  );
}
