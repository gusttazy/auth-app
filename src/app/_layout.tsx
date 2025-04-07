/**
 * Layout principal da aplicação
 * 
 * Este arquivo implementa:
 * - Configuração do contexto de autenticação
 * - Gerenciamento de estado global
 * - Navegação baseada em arquivos (File-based routing)
 * - Animações de transição personalizadas
 * - Carregamento de fontes personalizadas
 */

import { useEffect, useCallback } from "react";
import { View, Animated } from "react-native";
import { router, Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

// Tipagem para animações de transição
interface LayoutsProps {
  screen: { width: number; height: number };
}

interface AnimationProps {
  current: {
    progress: Animated.AnimatedInterpolation<string | number>;
  };
  layouts: LayoutsProps;
}

/**
 * Implementação de animação de transição horizontal
 * Utiliza o Animated API do React Native para criar transições suaves
 */
const horizontalTransition = ({ current, layouts }: AnimationProps) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0],
        }),
      },
    ],
  },
});

/**
 * Componente Root da aplicação
 * Implementa o padrão Provider para disponibilizar o contexto de autenticação
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

/**
 * Componente de navegação principal
 * Implementa:
 * - Gerenciamento de estado de autenticação
 * - Redirecionamento automático baseado em autenticação
 * - Carregamento de fontes
 * - Configuração de navegação
 */
function AppStack() {
  const { setAuth } = useAuth();

  /**
   * Callback para gerenciar mudanças no estado de autenticação
   * Utiliza o padrão Observer para monitorar mudanças no estado de autenticação
   */
  const handleAuthChange = useCallback(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        router.push('/(panel)/profile/page');
      } else {
        setAuth(null);
        router.push('/(auth)/signin/page');
      }
    });
  }, [setAuth]);

  useEffect(() => {
    handleAuthChange();
  }, [handleAuthChange]);

  // Carregamento de fontes personalizadas usando o hook useFonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "card",
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: horizontalTransition,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(panel)" />
    </Stack>
  );
}
