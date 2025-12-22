import Image from "next/image";

export default function Logo() {
  return (
    <Image
      className="w-full"
      src="/logo.svg"
      alt="Logo"
      width={0}
      height={0}
      priority
    />
  );
}
