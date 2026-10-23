import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

interface ConfirmationOverlayProps {
  message: string;
  confirmButtonText: string;
  onPressConfirm: () => void;
  confirmButtonClassNames?: string;
  messageClassNames?: string;
}

export function ConfirmationOverlay({
  message,
  confirmButtonText,
  onPressConfirm,
  confirmButtonClassNames = 'rounded-lg bg-blue-600 active:bg-blue-700 py-3 flex-1 mr-3 items-center',
  messageClassNames = 'mt-3 text-xl font-bold text-neutral-600',
}: ConfirmationOverlayProps) {
  return (
    <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
      <View className="bg-white p-6 rounded-xl shadow-lg items-center justify-center">
        <Text className={messageClassNames}>{message}</Text>
        <View className="flex-row justify-between items-center p-5 bg-white pb-8">
          <TouchableOpacity
            onPress={onPressConfirm}
            className={confirmButtonClassNames}>
            <Text className="text-white font-bold text-lg">
              {confirmButtonText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-transparent border border-neutral-200 active:bg-neutral-100 rounded-lg py-3 flex-1 ml-3 items-center">
            <Text className="text-gray-900 font-bold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
