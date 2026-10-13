import { View, Text, TouchableOpacity } from 'react-native';

interface OverlayMessageProps {
  message: string;
  textClassNames: string;
  onPressOk: () => void;
}

export function OverlayMessage({
  message,
  textClassNames = 'mt-3 text-xl font-bold text-neutral-600',
  onPressOk,
}: OverlayMessageProps) {
  return (
    <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
      <View className="bg-white p-6 rounded-xl shadow-lg items-center justify-center">
        <Text className={textClassNames}>{message}</Text>
        <TouchableOpacity
          onPress={onPressOk}
          className="bg-blue-600 active:bg-blue-700 h-12 w-32 mt-5 rounded-lg items-center justify-center ">
          <Text className="text-white font-bold text-lg">Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
