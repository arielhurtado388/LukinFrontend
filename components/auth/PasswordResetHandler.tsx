"use client";
import React, { useState } from "react";
import ValidarTokenForm from "./ValidarTokenForm";
import ResetearPasswordForm from "./ResetearPassword";

export default function PasswordResetHandler() {
  const [esValido, setEsValido] = useState(false);

  return (
    <>
      {!esValido ? (
        <ValidarTokenForm setEsValido={setEsValido} />
      ) : (
        <ResetearPasswordForm />
      )}
    </>
  );
}
