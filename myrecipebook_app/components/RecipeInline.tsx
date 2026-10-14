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
      <View className="flex-row py-2 p-4 items-center bg-white active:bg-gray-100 rounded-xl mb-2 border border-neutral-200/80 rounded-2xl shadow-sm shadow-neutral-200 w-full">
        <View className="flex-1 py-2">
          <Text className="text-2xl font-semibold text-gray-900">{title}</Text>
          <Text className="text-base text-gray-500 mt-0.5">
            {descriptionPreview}
          </Text>
        </View>
      </View>
    </Link>
  );
}
