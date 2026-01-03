import Logo from "@/components/ui/Logo";
// import { verificarSesion } from "@/src/auth/dal";
import Link from "next/link";

export default async function Home() {
  // const usuario = await verificarSesion();
  return (
    <>
      <header className=" bg-purple-950 py-5">
        <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-96 lg:w-[500px]">
            <Logo />
          </div>
          <nav className="flex flex-col lg:flex-row lg:justify-end gap-5 w-full ">
            {/* {!usuario.isAuth ? (
              <>
                <Link
                  href="/auth/registro"
                  className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
                >
                  Registrarme
                </Link>
                <Link
                  href="/auth/login"
                  className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
                >
                  Iniciar Sesión
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin"
                  className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
                >
                  Mis Presupuestos
                </Link>
                <Link
                  href="/admin/perfil/configuracion"
                  className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
                >
                  Mi Perfil
                </Link>
              </>
            )} */}

            <Link
              href="/auth/registro"
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Registrarme
            </Link>
            <Link
              href="/auth/login"
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className=" max-w-3xl mx-auto p-5 space-y-5 mt-20">
        <h1 className="font-black text-4xl text-purple-950">
          Administrador de Gastos
        </h1>
        <p className="text-xl font-bold">
          controla tus <span className="text-amber-500">finanzas</span>
        </p>
        <p className="text-lg">
          Domina tus finanzas con nuestro Administrador de Gastos. Simplifica la
          gestión de tus ingresos y egresos en un solo lugar, de manera
          intuitiva y eficiente. Toma el control total de tus finanzas
          personales o empresariales con nuestra plataforma fácil de usar.
        </p>

        <h2 className="font-black text-xl text-purple-950 ">
          Ventajas de CashTrackr
        </h2>

        <ol className="grid grid-cols-1 gap-5 items-start">
          <li className="p-5 shadow-lg text-lg">
            <span className="text-purple-950 font-black">
              Organización sin Esfuerzo:{" "}
            </span>
            Clasifica y visualiza tus gastos de forma clara y ordenada, sin
            complicaciones con nuestro panel amigable y fácil de usar.
          </li>
          <li className="p-5 shadow-lg text-lg">
            <span className="text-purple-950 font-black">
              Presupuestación Inteligente:{" "}
            </span>
            Establece objetivos financieros realistas y sigue tu progreso con
            nuestras herramientas de presupuestación inteligente.
          </li>
          <li className="p-5 shadow-lg text-lg">
            <span className="text-purple-950 font-black">
              Acceso en cualquier lugar:{" "}
            </span>
            Nuestra plataforma está disponible para que puedas gestionar tus
            finanzas desde donde te encuentres.
          </li>
          <li className="p-5 shadow-lg text-lg">
            <span className="text-purple-950 font-black">
              Seguridad Garantizada:{" "}
            </span>
            Protegemos tus datos con los más altos estándares de seguridad, para
            que puedas utilizar nuestra plataforma con total tranquilidad.
          </li>
        </ol>
      </main>
    </>
  );
}
