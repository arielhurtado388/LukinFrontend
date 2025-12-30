import { cookies } from "next/headers";

export default function obtenerToken() {
  return cookies().get("LUKIN_TOKEN")?.value;
}
