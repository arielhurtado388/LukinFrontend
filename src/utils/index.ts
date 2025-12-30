export function formatearMoneda(cantidad: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cantidad);
}

export function formatearFecha(isoString: string) {
  const fecha = new Date(isoString);

  const formateador = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formateador.format(fecha);
}
