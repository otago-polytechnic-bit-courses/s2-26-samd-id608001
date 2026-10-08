import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingOverlayProps {
  message: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
      <View className="bg-white p-6 rounded-xl shadow-lg items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-3 text-sm font-medium text-neutral-600">
          {message}
        </Text>
      </View>
    </View>
  );
}
