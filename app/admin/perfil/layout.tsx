import PerfilTabs from "@/components/perfil/PerfilTabs";
import ToastNotification from "@/components/ui/ToastNotification";

export default async function PerfilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PerfilTabs />
      {children}
      <ToastNotification />
    </>
  );
}
