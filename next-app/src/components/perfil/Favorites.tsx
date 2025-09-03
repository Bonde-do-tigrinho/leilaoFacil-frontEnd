"use client";
import { useSidebar } from "@/context/SideBarContext";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { useEffect, useState, useMemo } from "react";
import ImovelCard from "@/components/buscador/ImovelCard";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; 
import { Imovel } from "@/data/models/Imovel";
import { parseCookies } from "nookies"; 

import { listarImoveisFavoritos } from "@/services/imovelServices";

export default function Favorites() {
  const { setTipo } = useSidebar();
  const { user, isLoading, isAuthenticated } = useAuth(); 
  const [busca, setBusca] = useState("");
  const [imoveisFavoritos, setImoveisFavoritos] = useState<Imovel[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const setUserConfigSidebar = () => setTipo("user_config");
  useEffect(() => {
    setUserConfigSidebar();
  }, []); 

  const fetchFavoritos = async () => {
    setIsFetching(true);
    try {
      const response = await listarImoveisFavoritos();
      setImoveisFavoritos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      setImoveisFavoritos([]); 
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setTipo("user_config");
  }, [setTipo]); 

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchFavoritos();
    } else if (!isLoading && !isAuthenticated) {
      setImoveisFavoritos([]);
      setIsFetching(false);
    }
  }, [user, isLoading, isAuthenticated]); 

const imoveisPesquisados = useMemo(() => {
    if (!busca) {
      return imoveisFavoritos; 
    }
    return imoveisFavoritos.filter((imovel) => {
      return imovel.endereco?.toLowerCase().includes(busca.toLowerCase());
    });
  }, [busca, imoveisFavoritos]);

  if (isLoading || isFetching) {
    return <p>Carregando seus imóveis favoritos...</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-1 h-6 bg-primary rounded-lg" />
            <h1 className="text-3xl font-semibold text-zinc-900">
              Seus imóveis favoritos
            </h1>
          </div>
          <p className="text-zinc-500">
            Aqui você encontra todos os imóveis que você favoritou para
            acompanhar os leilões de forma rápida e prática.
          </p>
        </div>
        <div className="w-full h-[0.5px] bg-zinc-300 rounded-2xl my-2" />
        <div className="flex flex-col md:flex-row md:gap-3 items-center justify-between my-1">
          <p className="text-zinc-500">
            Foram encontrados{" "}
            <span className="font-semibold">{imoveisPesquisados.length}</span>{" "}
            imóveis
          </p>

          <div className="w-80 h-12 flex items-center justify-between border border-zinc-300 text-zinc-500 rounded-lg px-3">
            <input
              type="text"
              placeholder="Pesquisar favoritos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 focus:border-none outline-none"
            />
            <IconSearch />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {imoveisPesquisados.length > 0 ? (
            imoveisPesquisados.map((imovel) => (
              <ImovelCard key={imovel._id} imovel={imovel} />
            ))
          ) : (
            <div className="w-[900px] flex flex-col py-2 px-20 items-center justify-center gap-4">
              <h3 className="text-3xl text-zinc-900 font-semibold">
                {busca ? "Ops! Nenhum resultado para sua busca" : "Você ainda não tem favoritos"}
              </h3>
              <p className="text-zinc-600 text-center">
                {busca ? "Tente refinar sua pesquisa ou explore mais imóveis para adicionar aos seus favoritos." : "Explore nossos imóveis e adicione os que mais gostar aos seus favoritos!"}
              </p>
              <Image
                src={"/img/search-house.png"}
                alt="imóvel não encontrado"
                width={400}
                height={150}
              />
            </div>
          )}
        </div>
    </>
  );
}