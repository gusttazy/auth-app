/**
 * Tela de Cadastro
 * 
 * Implementa:
 * - Formulário de cadastro com validações
 * - Integração com Supabase Auth
 * - Feedback visual de carregamento
 * - Redirecionamento após cadastro
 * - Tratamento de erros específicos
 */

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  // Estados para gerenciar os campos do formulário e estado de carregamento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Função para processar o cadastro
   * 
   * Implementa:
   * - Validações de campos obrigatórios
   * - Validação de comprimento da senha
   * - Cadastro no Supabase Auth
   * - Tratamento de erros específicos
   * - Feedback visual de sucesso
   * - Redirecionamento para login
   */
  async function handleSignup() {
    // Validações básicas
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, informe seu nome");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, informe sua senha");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (error) {
        // Tratamento específico de erros comuns
        if (error.message.includes("email")) {
          Alert.alert("Erro", "Este email já está cadastrado");
        } else if (error.message.includes("password")) {
          Alert.alert("Erro", "A senha não atende aos requisitos mínimos");
        } else {
          Alert.alert("Erro", error.message || "Não foi possível realizar o cadastro");
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        setLoading(false);
        Alert.alert("Sucesso", "Cadastro realizado com sucesso! Faça login para continuar.");
        router.replace("/(auth)/signin/page");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>
            Auth<Text style={styles.whiteText}>App</Text>
          </Text>
          <Text style={styles.subtitle}>
            Preencha os campos abaixo para criar sua conta
          </Text>
        </View>

        <View style={styles.form}>
          <ScrollView style={styles.scrollContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#494848"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#494848"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Carregando..." : "CADASTRAR"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Estilos da tela de cadastro
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.zinc,
  },
  container: {
    flex: 1,
    paddingTop: 100,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 32,
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
  },
  whiteText: {
    color: colors.white,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    padding: 20,
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});
