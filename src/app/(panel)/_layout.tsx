import { Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function PanelLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/signin/page" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "card",
      }}
    >
      <Stack.Screen name="profile/page" />
    </Stack>
  );
} 