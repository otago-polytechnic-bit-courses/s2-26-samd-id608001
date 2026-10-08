import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';

export default function LoginScreen() {
  const { login, setIsLoading, isLoading, isAuthenticated } = useAuth();
  const { registered, initialUsername } = useLocalSearchParams<{
    registered?: string;
    initialUsername?: string;
  }>();
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(initialUsername ?? '');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    login(username, password)
      .then(() => {
        setIsLoading(false);
        router.push({
          pathname: '/recipes',
        });
      })
      .catch(error => {
        setIsLoading(false);
        setError(String(error));
      });
  };

  const handleRegisterNavigation = () => {
    router.push({ pathname: '/register' });
  };

  if (isAuthenticated) return <Redirect href="/recipes" />;

  return (
    <View className="flex-1 justify-center items-center bg-neutral-50 px-6">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Container to center and constrain width on larger tablet screens */}
      <View className="w-full max-w-md md:max-w-xl">
        {/* --- Responsive Bordered Login Card --- */}
        <View className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm shadow-neutral-200 w-full">
          <View className="mb-6 px-2">
            <Text className="text-3xl font-bold text-neutral-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-neutral-500">
              Log in to continue
            </Text>
          </View>

          {registered === 'true' && (
            <View className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5 mx-1">
              <Text className="text-emerald-800 font-semibold text-base mb-1">
                🎉 Registration Successful!
              </Text>
              <Text className="text-emerald-600 text-sm">
                Your account has been created. Please log in below to continue.
              </Text>
            </View>
          )}

          <View className="mb-4">
            <Text className="text-sm font-medium text-neutral-800 mb-2">
              Username
            </Text>
            <TextInput
              className="h-12 border border-neutral-200 rounded-lg px-4 text-base text-neutral-900 bg-neutral-50"
              placeholder="username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-neutral-800 mb-2">
              Password
            </Text>
            <TextInput
              className="h-12 border border-neutral-200 rounded-lg px-4 text-base text-neutral-900 bg-neutral-50"
              placeholder="password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          {error && (
            <Text className="text-sm font-medium text-red-500 mb-4">
              {error}
            </Text>
          )}

          {/* --- Dual Button Row Layout --- */}
          <View className="flex-row items-center justify-between mt-2 gap-x-4">
            {/* Secondary Registration Link Button */}
            <TouchableOpacity
              onPress={handleRegisterNavigation}
              disabled={isLoading}
              className="flex-1 h-12 rounded-lg items-center justify-center bg-transparent border border-neutral-200 active:bg-neutral-100">
              <Text className="text-neutral-600 text-base font-medium">
                Register
              </Text>
            </TouchableOpacity>

            {/* Primary Login Submission Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`flex-1 h-12 rounded-lg items-center justify-center ${isLoading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'}`}>
              <Text className="text-white text-base font-semibold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* --- End of Login Card --- */}
      </View>

      {/* Full-screen loading overlay */}
      {isLoading && (
        <LoadingOverlay message="Logging you in..."></LoadingOverlay>
      )}
    </View>
  );
}
