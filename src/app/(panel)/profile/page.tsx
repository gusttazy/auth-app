import { supabase } from "@/lib/supabase";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import colors from "@/constants/colors";

export default function Profile() {
  const { user, setAuth } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Erro ao fazer logout", "Não foi possível fazer logout");
      return;
    }

    router.replace("/(auth)/signin/page");
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("@/assets/images/user.png")}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>{user?.user_metadata?.name || "Usuário"}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc,
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.gray,
    overflow: "hidden",
    marginBottom: 20,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  email: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  logoutButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins_600SemiBold",
  },
});
