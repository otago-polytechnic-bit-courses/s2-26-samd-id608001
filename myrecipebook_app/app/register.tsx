import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';

// Define the shape of our API validation error response
interface ValidationErrorState {
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
  non_field_errors?: string[]; // Fallback for general errors
}

export default function RegisterScreen() {
  const { register, setIsLoading, isLoading } = useAuth();
  const [errors, setErrors] = useState<ValidationErrorState | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegister = () => {
    setErrors(null);

    register(username, password, confirmPassword)
      .then(() => {
        setIsLoading(false);
        router.push({
          pathname: '/login',
          params: { registered: 'true', initialUsername: username },
        });
      })
      .catch(err => {
        setIsLoading(false);

        // Check if the error object resembles your API validation format
        if (err && typeof err === 'object') {
          setErrors(err);
        } else {
          // Fallback if the server crashes or drops a generic string error
          setErrors({ non_field_errors: [String(err)] });
        }
      });
  };

  const handleLoginNavigation = () => {
    router.push({ pathname: '/login' });
  };

  return (
    <View className="flex-1 justify-center items-center bg-neutral-50 px-6">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="w-full max-w-md md:max-w-xl">
        <View className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm shadow-neutral-200 w-full">
          <View className="mb-6 px-2">
            <Text className="text-3xl font-bold text-neutral-900 mb-2">
              Create Account
            </Text>
            <Text className="text-base text-neutral-500">
              Sign up to get started
            </Text>
          </View>

          {/* --- Username Field --- */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-neutral-800 mb-2">
              Username
            </Text>
            <TextInput
              className={`h-12 border rounded-lg px-4 text-base text-neutral-900 bg-neutral-50 ${
                errors?.username ? 'border-red-400' : 'border-neutral-200'
              }`}
              placeholder="username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors?.username?.map((msg, index) => (
              <Text
                key={index}
                className="text-xs font-medium text-red-500 mt-1 pl-1">
                {msg}
              </Text>
            ))}
          </View>

          {/* --- Password Field --- */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-neutral-800 mb-2">
              Password
            </Text>
            <TextInput
              className={`h-12 border rounded-lg px-4 text-base text-neutral-900 bg-neutral-50 ${
                errors?.password ? 'border-red-400' : 'border-neutral-200'
              }`}
              placeholder="password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors?.password?.map((msg, index) => (
              <Text
                key={index}
                className="text-xs font-medium text-red-500 mt-1 pl-1">
                {msg}
              </Text>
            ))}
          </View>

          {/* --- Confirm Password Field --- */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-neutral-800 mb-2">
              Confirm Password
            </Text>
            <TextInput
              className={`h-12 border rounded-lg px-4 text-base text-neutral-900 bg-neutral-50 ${
                errors?.confirmPassword
                  ? 'border-red-400'
                  : 'border-neutral-200'
              }`}
              placeholder="confirm password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors?.confirmPassword?.map((msg, index) => (
              <Text
                key={index}
                className="text-xs font-medium text-red-500 mt-1 pl-1">
                {msg}
              </Text>
            ))}
          </View>

          {/* --- Fallback Global Non-Field Errors --- */}
          {errors?.non_field_errors?.map((msg, index) => (
            <Text
              key={index}
              className="text-sm font-medium text-red-500 mb-4 text-center">
              {msg}
            </Text>
          ))}

          {/* --- Dual Button Row Layout --- */}
          <View className="flex-row items-center justify-between mt-2 gap-x-4">
            <TouchableOpacity
              onPress={handleLoginNavigation}
              disabled={isLoading}
              className="flex-1 h-12 rounded-lg items-center justify-center bg-transparent border border-neutral-200 active:bg-neutral-100">
              <Text className="text-neutral-600 text-base font-medium">
                Log in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`flex-1 h-12 rounded-lg items-center justify-center ${isLoading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'}`}>
              <Text className="text-white text-base font-semibold">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Full-screen loading overlay */}
      {isLoading && (
        <LoadingOverlay message="Registering you..."></LoadingOverlay>
      )}
    </View>
  );
}
