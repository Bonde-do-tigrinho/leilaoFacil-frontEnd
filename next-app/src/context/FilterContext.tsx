"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Imovel } from "@/data/models/Imovel";

// 1. Importe as funções que você já criou no seu serviço de imóveis!
import { listarImoveisFiltrados, listarImoveis } from "@/services/imovelServices"; // Corrigido para imovelService (singular)

// A interface Filtros está ótima
interface Filtros {
  estado: string | null;
  cidade: string | null;
  bairro: string[] | null;
  tipoImovel: string | null;
  valor: string | null;
  banco: string[] | null;
}

interface FiltroContextType {
  filtros: Filtros;
  imoveis: Imovel[];
  isLoading: boolean; // Adicionamos o estado de loading
  buscarComFiltros: (novosFiltros: Filtros) => Promise<void>;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export const FiltroProvider = ({ children }: { children: ReactNode }) => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Começa true para a busca inicial
  const [filtros, setFiltros] = useState<Filtros>({
    // Seu estado de filtros inicial está bom
    estado: null,
    cidade: null,
    bairro: [],
    tipoImovel: "indiferente",
    valor: "",
    banco: [],
  });

  // 2. A função de busca agora é muito mais simples
  const buscarComFiltros = async (novosFiltros: Filtros) => {
    setFiltros(novosFiltros);
    setIsLoading(true);
    try {
      // Chama a função do serviço, sem se preocupar com tokens!
      const response = await listarImoveisFiltrados(novosFiltros);
      setImoveis(response.data);
    } catch (error) {
      console.error("Erro ao buscar imóveis com filtros:", error);
      setImoveis([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. O useEffect para a busca inicial também fica mais simples
  useEffect(() => {
    const buscarImoveisIniciais = async () => {
      setIsLoading(true);
      try {
        // Chama a função do serviço, sem se preocupar com tokens!
        const response = await listarImoveis();
        setImoveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar imóveis iniciais:", error);
      } finally {
        setIsLoading(false);
      }
    };

    buscarImoveisIniciais();
  }, []); // O array vazio garante que isso rode apenas uma vez

  return (
    <FiltroContext.Provider value={{ filtros, imoveis, isLoading, buscarComFiltros }}>
      {children}
    </FiltroContext.Provider>
  );
};

export const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error("useFiltro deve ser usado dentro de um FiltroProvider");
  }
  return context;
};