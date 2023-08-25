import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>Administrador Logado: <b>{session?.user?.name}</b></h2>
        <img
          src={session?.user?.image}
          alt="Imagem do usuário administrador"
          className="rounded-full "
        />
      </div>
    </Layout>
  )
}
