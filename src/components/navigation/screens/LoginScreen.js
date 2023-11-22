import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, obterUrlBase } from "../../autenticacao/AuthContext";

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const userAuth = useContext(AuthContext);

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const [email, onChangeEmail] = React.useState("");
  const [senha, onChangePassword] = React.useState("");

  const logar = async () => {
    try {
      const url = `${obterUrlBase()}/autenticacao/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        console.log(token);
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userId", user.id.toString());
        navigation.navigate("Home");
      } else {
        console.error("Credenciais inválidas. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../../assets/HELPI.png")}
        style={styles.logoImage}
      />
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(email) => onChangeEmail(email)}
        placeholder="Email"
        value={email}
      />
      <Text style={styles.text}>Senha</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(senha) => onChangePassword(senha)}
        placeholder="Senha"
        value={senha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={logar}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
      <Text style={styles.registerButton} onPress={goToRegister}>
        Cadastrar
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#a24fb0",
    padding: 20,
  },
  loginButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 5,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  registerButton: {
    color: "#1bd39d",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});

export default LoginScreen;
