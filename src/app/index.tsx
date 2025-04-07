import colors from "@/constants/colors";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(panel)/profile/page" />;
  }

  return <Redirect href="/(auth)/signin/page" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.zinc,
  },
});
