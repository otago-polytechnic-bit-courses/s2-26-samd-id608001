import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface SuccessOverlayProps {
  message: string;
}

export function SuccessOverlay({ message }: SuccessOverlayProps) {
  return (
    <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
        <View className="bg-white p-6 rounded-xl shadow-lg items-center justify-center">
            <Text className="mt-3 text-xl font-bold text-neutral-600">
                {message}
            </Text>
            <TouchableOpacity
            onPress={() => router.back()}
            className="bg-blue-600 active:bg-blue-700 h-12 w-32 mt-5 rounded-lg items-center justify-center ">
                <Text className="text-white font-bold text-lg">Ok</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
