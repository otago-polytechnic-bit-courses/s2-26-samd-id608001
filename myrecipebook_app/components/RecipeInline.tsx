import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Recipe } from './lib/recipesApi';

export function RecipeInline({ id, title, description }: Recipe) {
  const descriptionPreview =
    description.length > 96
      ? `${description.substring(0, 96)}...`
      : description;

  return (
    <Link href={`/recipes/${id}`} asChild>
      <View className="flex-row py-2 p-4 items-center bg-white active:bg-gray-100 rounded-xl mb-2">
        <View className="w-12 h-12 rounded-lg bg-[#2BBCED]" />
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-gray-900">{title}</Text>
          <Text className="text-sm text-gray-500 mt-0.5">
            {descriptionPreview}
          </Text>
        </View>
      </View>
    </Link>
  );
}
