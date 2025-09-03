"use client";
import Template from "@/components/layout/Template";
import { useState, useEffect, useMemo } from "react";
import ImovelCard from "@/components/buscador/ImovelCard";
import Image from "next/image";
import SubFiltros from "@/components/buscador/SubFiltros";
import { useFiltro } from "@/context/FilterContext";
import { useSidebar } from "@/context/SideBarContext";
import { IconArrowRight, IconSearch} from "@tabler/icons-react";
import Paginacao from "@/components/buscador/Paginacao";
import { Imovel } from "@/data/models/Imovel";

export default function Buscador() {
  useEffect(() => {
    setTipo("filter");
  }, []);
  const { setTipo, toggleSidebar } = useSidebar();
  const [filter, setFilter] = useState<"valor" | "dataLeilao" | null>(null);
  const [busca, setBusca] = useState("");
  const [crescente, setCrescente] = useState(false);
  const { imoveis: fetchedImoveis, isLoading } = useFiltro();
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 15; 

  const handleFiltro = (tipo: "valor" | "dataLeilao" | null) => {
  if (filter === tipo) {
    if (crescente) {
      setCrescente(false); // 2º clique → decrescente
    } else {
      setFilter(null);     // 3º clique → desativa filtro
      setCrescente(true);  // reseta o estado para o próximo uso
    }
  } else {
    setFilter(tipo);       // 1º clique → novo filtro ativado
    setCrescente(true);    
  }
};

const imoveisFiltrados = useMemo(() => {
    if (!busca.trim()) {
      return fetchedImoveis; // Se a busca for vazia, usa a lista completa.
    }
    const termoBuscaLower = busca.toLowerCase();
    return fetchedImoveis.filter(imovel =>
      imovel.endereco?.toLowerCase().includes(termoBuscaLower) ||
      imovel.cidade?.toLowerCase().includes(termoBuscaLower) ||
      imovel.numero_imovel?.toString().includes(termoBuscaLower)
    );
  }, [fetchedImoveis, busca]);

  const sortedImoveis = useMemo(() => {
    const imoveisParaOrdenar = [...imoveisFiltrados];

    const compararDatas = (datasA?: Date[], datasB?: Date[]): number => {
      const dateA = datasA?.[0] ? new Date(datasA[0]).getTime() : null;
      const dateB = datasB?.[0] ? new Date(datasB[0]).getTime() : null;
      if (dateA && dateB) return dateA - dateB;
      return dateB ? -1 : dateA ? 1 : 0;
    };
    
    if (filter === "valor") {
        imoveisParaOrdenar.sort((a, b) => {
            const valorA = a.valor_avaliacao ?? -1;
            const valorB = b.valor_avaliacao ?? -1;
            return valorA - valorB;
        });
    } else if (filter === "dataLeilao") {
        imoveisParaOrdenar.sort((a, b) => compararDatas(a.datas_leiloes, b.datas_leiloes));
    }

    if (!crescente) {
        imoveisParaOrdenar.reverse();
    }

    return imoveisParaOrdenar;
  }, [imoveisFiltrados, filter, crescente]);

  const totalPages = Math.ceil(sortedImoveis.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImoveis = sortedImoveis.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [imoveisFiltrados, filter, crescente]);

   if (isLoading) {
    return (
      <Template>
        <section className="w-full flex justify-center items-center p-8">
          <p>Carregando imóveis...</p>
        </section>
      </Template>
    );
  }

  return (
    <Template>
      <section className="w-full flex flex-col p-8 gap-4 mb-10 relative">
        <div className="w-full md:hidden">
          <button
            onClick={toggleSidebar}
            className="size-10 flex items-center justify-center bg-white shadow-lg cursor-pointer rounded-full text-zinc-600"
          >
            <IconArrowRight />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-1 h-6 bg-primary rounded-lg" />
          <h1 className="text-3xl font-semibold text-zinc-900">Buscador</h1>
        </div>

        <SubFiltros
          crescente={crescente}
          filter={filter}
          handleFiltro={handleFiltro}
        />

        <div className="w-full h-[0.5px] bg-zinc-300 rounded-2xl my-2" />
          <div className="flex flex-row justify-between w-full pr-[8rem]">
            <p className="text-zinc-500">
              Foram encontrados{" "}
            <span className="font-semibold">{sortedImoveis.length}</span> imóveis
          </p>

          <div className="w-80 h-12 flex items-center justify-between border border-zinc-300 text-zinc-500 rounded-lg px-3">
            <input
              type="text"
              placeholder="Pesquisar imóveis..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 focus:border-none outline-none"
            />
            <IconSearch />
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-10">
          {currentImoveis.length !== 0 ? (
            currentImoveis.map((imovel) => (
              <ImovelCard key={imovel._id} imovel={imovel} />
            ))
          ) : (
            <div className="w-full max-w-lg mx-auto flex flex-col py-10 px-4 items-center justify-center gap-4 text-center">
              <h3 className="text-2xl md:text-3xl text-zinc-900 font-semibold">
                Ops! Nenhum resultado encontrado
              </h3>
              <p className="text-zinc-600 text-center">
                Não há nenhum imóvel que se encaixa nos filtros aplicados.
                Pesquise novamente para encontrar seus imóveis.
              </p>
              <Image
                src={"/img/search-house.png"}
                alt="imóvel não encontrado"
                width={300}
                height={112}
              />
            </div>
          )} 
        </div>
         <Paginacao 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
         />
      </section>
    </Template>
  );
}
