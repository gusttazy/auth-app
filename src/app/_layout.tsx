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

// Transição horizontal personalizada
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

// Root do app com contexto de autenticação
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

// Navegação principal da aplicação
function AppStack() {
  const { setAuth } = useAuth();

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
