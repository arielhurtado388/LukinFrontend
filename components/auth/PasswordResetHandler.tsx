"use client";

import React, { useState } from "react";
import ValidarTokenForm from "./ValidarTokenForm";
import ResetearPasswordForm from "./ResetearPasswordForm";

export default function PasswordResetHandler() {
  const [esValido, setEsValido] = useState(false);
  const [token, setToken] = useState("");

  return (
    <>
      {!esValido ? (
        <ValidarTokenForm
          setEsValido={setEsValido}
          token={token}
          setToken={setToken}
        />
      ) : (
        <ResetearPasswordForm token={token} />
      )}
    </>
  );
}
