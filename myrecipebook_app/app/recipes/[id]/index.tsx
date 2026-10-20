import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getRecipe, Recipe } from '../../../components/lib/recipesApi';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { ErrorOverlay } from '../../../components/ErrorOverlay';
import { HeaderMenu, MenuItem } from '../../../components/HeaderMenu';

export default function StudioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const recipeMenuOptions: MenuItem[] = [
    {
      label: 'Edit Recipe',
      icon: 'pencil-outline',
      onPress: () => router.push(`/recipes/${id}/edit`),
    },
  ];

  useEffect(() => {
    getRecipe(id)
      .then(data => {
        setRecipe(data);
      })
      .catch(() => {
        setError('An Error occurred while fetching the recipe!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="h-full px-6 py-3">
      {/* Configure Expo Router Stack Header */}
      <Stack.Screen
        options={{
          title: recipe?.title || 'Recipe Details',
          headerRight: () => <HeaderMenu items={recipeMenuOptions} />,
        }}
      />

      {isLoading && <LoadingOverlay message="Fetching Recipe..." />}
      {!isLoading && error != null && (
        <ErrorOverlay
          message={error}
          onPressOk={() => {
            router.back();
          }}
        />
      )}

      <View className="py-3">
        <Text className="text-base font-bold text-gray-500 uppercase tracking-wider">
          Description
        </Text>
        <Text className="text-lg text-neutral-700 mt-1 leading-relaxed">
          {recipe?.description}
        </Text>
      </View>

      <View className="py-3">
        <Text className="text-base font-bold text-gray-500 uppercase tracking-wider">
          Method
        </Text>
        <Text className="text-lg text-neutral-700 mt-1 leading-relaxed">
          {recipe?.method}
        </Text>
      </View>

      <View className="py-3">
        <Text className="text-base font-bold text-gray-500 uppercase tracking-wider">
          Ingredients
        </Text>
        {recipe?.ingredients.map((ingredient, index) => {
          return (
            <Text
              key={index}
              className="text-lg text-neutral-700 mt-1 leading-relaxed">{`- ${ingredient.amount} ${ingredient.measurement} ${ingredient.ingredient_name}`}</Text>
          );
        })}
      </View>
    </ScrollView>
  );
}
