import { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Stack, router, useFocusEffect } from 'expo-router';
import { RecipeInline } from '../../components/RecipeInline';
import { Recipe, getRecipes } from '../../components/lib/recipesApi';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { ErrorOverlay } from '../../components/ErrorOverlay';
import { HeaderMenu, MenuItem } from '../../components/HeaderMenu';

export default function RecipeListScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const recipeMenuOptions: MenuItem[] = [
    {
      label: 'Create Recipe',
      icon: 'add-circle-outline',
      onPress: () => router.push('/recipes/create'),
    },
  ];

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getRecipes()
        .then(data => {
          setRecipes(data);
        })
        .catch(() => {
          setError('An Error occurred while fetching studios!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []),
  );

  return (
    <View className="flex-1 bg-white">
      {/* Configure Expo Router Stack Header */}
      <Stack.Screen
        options={{
          title: 'Recipe Library',
          headerRight: () => <HeaderMenu items={recipeMenuOptions} />,
        }}
      />

      {isLoading && <LoadingOverlay message="Fetching Your Recipes..." />}
      {!isLoading && error != null && <ErrorOverlay message={error} />}

      {/* Main List Content */}
      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <RecipeInline {...item} />}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-24">
            <Text className="text-neutral-400 text-base">
              No recipes found yet.
            </Text>
          </View>
        }
      />
    </View>
  );
}
