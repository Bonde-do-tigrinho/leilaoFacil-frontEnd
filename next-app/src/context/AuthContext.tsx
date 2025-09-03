"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';

import { adicionarFavorito, removerFavorito } from '@/services/userService';
import { listarImoveisFavoritos } from '@/services/imovelServices';

type UserPayload = {
  userId: string;
  nome: string;
  email: string;
  cargo: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: UserPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
  favorites: string[];
  addFavorite: (imovelId: string) => Promise<void>;
  rmvFavorite: (imovelId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
  const checkUserAndLoadData = async () => {
    const cookies = parseCookies();
    const token = cookies['auth.token'];

    try {
      if (token) {
        const decodedUser: UserPayload = jwtDecode(token);
        setUser(decodedUser);
        await fetchFavorites();
      }
    } catch (error) {
      console.error("Token inválido ou sessão expirada, limpando...", error);
      destroyCookie(null, 'auth.token', { path: '/' });
      setUser(null); 
    } finally {

      setIsLoading(false);
    }
  };

  checkUserAndLoadData();
}, []);

  const fetchFavorites = async () => {
    try {
      const response = await listarImoveisFavoritos();
      const favoriteIds = response.data.map((imovel: any) => imovel._id.toString());
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Contexto: Erro ao buscar favoritos via serviço.", error);
      setFavorites([]);
    }
  };

const signIn = (token: string) => {
    try {
      const decodedUser: UserPayload = jwtDecode(token);
      setCookie(null, 'auth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/',
      });
      setUser(decodedUser);
      fetchFavorites(); // Busca os favoritos assim que o usuário loga
      router.push('/buscador');
    } catch (error) {
      console.error("Erro ao decodificar token no login:", error);
    }
  };

  const signOut = () => {
    destroyCookie(null, 'auth.token', { path: '/' });
    setUser(null);
    setFavorites([]);
    router.push('/login'); // Redireciona para o login ao sair
  };

 const addFavorite = async (imovelId: string) => {
    if (!user) return;
    try {
      await adicionarFavorito(imovelId);
      await fetchFavorites(); // RECARREGA a lista de favoritos para atualizar a UI
    } catch (error) {
      console.error("Contexto: Erro ao adicionar favorito.", error);
    }
  };
  
  const rmvFavorite = async (imovelId: string) => {
    if (!user) return;
    try {
      await removerFavorito(imovelId);
      await fetchFavorites(); // RECARREGA a lista de favoritos para atualizar a UI
    } catch (error) {
      console.error("Contexto: Erro ao remover favorito.", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signOut,
      favorites,
      addFavorite,
      rmvFavorite,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.isAdmin === true;
};