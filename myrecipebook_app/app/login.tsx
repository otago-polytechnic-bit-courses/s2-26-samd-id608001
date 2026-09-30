import { useState } from "react";
import { Text, ActivityIndicator, StyleSheet, TextInput, Button, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {  
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setLoading(true);
    login(username, password).then(() => {
      setLoading(false);
      router.push({
        pathname: '/recipes'
      });
    }).catch((error) => {
      setLoading(false);
      setError(String(error));
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</Text>
        <Text className="text-base text-neutral-500">Sign in to continue</Text>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-neutral-800 mb-2">Username</Text>
        <TextInput
          className="h-[50px] border border-neutral-200 rounded-lg px-4 text-base text-neutral-900 mb-4 bg-neutral-50"
          placeholder="username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text className="text-sm font-medium text-neutral-800 mb-2">Password</Text>
        <TextInput
          className="h-[50px] border border-neutral-200 rounded-lg px-4 text-base text-neutral-900 mb-4 bg-neutral-50"
          placeholder="password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {error && <Text className="text-base text-red-500 mb-3">{error}</Text>}
        
        {/* Custom styled button to replace the generic React Native <Button /> */}
        <TouchableOpacity 
          onPress={handleLogin}
          className="bg-blue-600 h-[50px] rounded-lg items-center justify-center mt-2 active:bg-blue-700"
        >
          <Text className="text-white text-base font-semibold">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 12,
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
});