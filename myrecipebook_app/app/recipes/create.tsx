import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import RecipeForm from '../../components/RecipeForm';
import { randomUUID } from 'expo-crypto';

interface Ingredient {
  id: string;
  amount: string;
  measurement: string;
  name: string;
}

export default function CreateRecipeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: randomUUID(), amount: '', measurement: '', name: '' },
  ]);

  // State for surfacing validation errors from the backend
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: randomUUID(), amount: '', measurement: '', name: '' },
    ]);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const payload = {
      title,
      description,
      method,
      ingredients: ingredients.map(({ amount, measurement, name }) => ({
        amount: parseFloat(amount),
        measurement,
        name,
      })),
    };
    // TODO placeholder create function
    setIsLoading(false);
    Alert.alert('Error', 'Failed to connect to the server.');
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Create a Recipe' }} />

      <RecipeForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        method={method}
        setMethod={setMethod}
        ingredients={ingredients}
        setIngredients={setIngredients}
        handleAddIngredient={handleAddIngredient}
      />

      {/* Footer Actions */}
      <View className="flex-row justify-between items-center p-5 border-t border-gray-200 bg-white pb-8">
        <TouchableOpacity
          onPress={handleCreate}
          className="rounded-lg bg-blue-600 active:bg-blue-700 py-3 flex-1 mr-3 items-center">
          <Text className="text-white font-bold text-lg">Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-transparent border border-neutral-200 active:bg-neutral-100 rounded-lg py-3 flex-1 ml-3 items-center">
          <Text className="text-gray-900 font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* Full-screen loading overlay */}
      {isLoading && <LoadingOverlay message="Creating Recipe"></LoadingOverlay>}
    </View>
  );
}
