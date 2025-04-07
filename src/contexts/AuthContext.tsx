/**
 * Contexto de Autenticação
 * 
 * Implementa o padrão Context API do React para gerenciar o estado de autenticação
 * em toda a aplicação. Utiliza o padrão Provider para disponibilizar o estado
 * e funções de autenticação para os componentes filhos.
 */

import { createContext, useState, useContext } from "react";
import { User } from "@supabase/supabase-js";

// Interface que define a estrutura do contexto de autenticação
interface AuthContextProps {
  user: User | null;
  setAuth: (authUser: User | null) => void;
}

// Criação do contexto com valores iniciais
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

/**
 * Provider do contexto de autenticação
 * 
 * Implementa:
 * - Gerenciamento de estado do usuário
 * - Função para atualizar o estado de autenticação
 * - Disponibilização do contexto para componentes filhos
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado que armazena o usuário autenticado
  const [user, setUser] = useState<User | null>(null);

  /**
   * Função para atualizar o estado de autenticação
   * @param authUser - Usuário autenticado ou null para logout
   */
  function setAuth(authUser: User | null) {
    setUser(authUser);
  }

  return (
    <AuthContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acessar o contexto de autenticação
 * 
 * @returns {AuthContextProps} - Objeto contendo o usuário e função de atualização
 */
export const useAuth = () => useContext(AuthContext);
