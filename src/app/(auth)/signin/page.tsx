import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "@/constants/colors";
import { Link } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignin() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Erro ao fazer login", "Não foi possível fazer login");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/(panel)/profile/page");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Auth<Text style={styles.whiteText}>App</Text>
        </Text>
        <Text style={styles.subtitle}>
          Transforme sua jornada digital com segurança e inovação
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#494848"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#494848"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "ENTRAR"}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Não tem uma conta?{" "}
            <Link href="/(auth)/signup/page" style={styles.registerText}>
              <Text style={styles.registerLinkText}>Cadastre-se</Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: colors.zinc,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: colors.red,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 28,
    color: colors.gray,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 60,
  },
  whiteText: {
    color: colors.white,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: colors.black,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    borderColor: colors.gray,
    opacity: 0.7,
    borderWidth: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.red,
    borderRadius: 4,
    height: 50,
    width: 150,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  registerText: {
    color: colors.black,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  registerLinkText: {
    color: colors.red,
    fontFamily: "Poppins_600SemiBold",
  },
});
