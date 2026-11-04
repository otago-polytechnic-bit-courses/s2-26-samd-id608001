import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import RecipeForm from '../../../components/RecipeForm';
import { randomUUID } from 'expo-crypto';
import {
  updateRecipe,
  DraftIngredient,
  DraftRecipe,
  RecipeValidationErrorState,
  getRecipe,
} from '../../../components/lib/recipesApi';
import { SuccessOverlay } from '../../../components/SuccessOverlay';
import { ErrorOverlay } from '../../../components/ErrorOverlay';

export default function CreateRecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [ingredients, setIngredients] = useState<DraftIngredient[]>([
    { id: randomUUID(), amount: '', measurement: '', ingredient_name: '' },
  ]);
  const [success, setSuccess] = useState<boolean>(false);

  // State for surfacing validation errors from the backend
  const [validationErrors, setValidationErrors] = useState<RecipeValidationErrorState | null>(null);
  // State for global error ie when fetching initial recipe
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecipe(id)
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
        setMethod(data.method);
        setIngredients(data.ingredients);
      })
      .catch(() => {
        setError('An Error occurred while fetching the recipe!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: randomUUID(), amount: '', measurement: '', ingredient_name: '' },
    ]);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setValidationErrors(null);

    const payload: DraftRecipe = {
      id: Number(id),
      title,
      description,
      method,
      ingredients: ingredients.map(
        ({ amount, measurement, ingredient_name }) => ({
          amount: Number(amount) || 0,
          measurement,
          ingredient_name,
        }),
      ),
    };
    try {
      await updateRecipe(payload);
      setSuccess(true);
    } catch (err: any) {
      if (err && err.validationError) {
        setValidationErrors(err);
      } else setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Editing Recipe' }} />

      {/* Full-screen loading overlay */}
      {isLoading && <LoadingOverlay message="Updating Recipe"></LoadingOverlay>}
      {/* Full-screen success overlay */}
      {!isLoading && success && (
        <SuccessOverlay
          message="Successfully Updated Recipe!"
          onPressOk={() => {
            router.back();
            router.back();
          }}
        />
      )}      
      {/* Full-screen Error overlay */}
      {!isLoading && !success && error && (
        <ErrorOverlay
          message={error}
          onPressOk={() => {
            router.back();
          }}
        />
      )}

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
        disableInputs={isLoading || success}
        errors={validationErrors}
      />

      {/* Footer Actions */}
      <View className="flex-row justify-between items-center p-5 border-t border-gray-200 bg-white pb-8">
        <TouchableOpacity
          onPress={handleUpdate}
          className="rounded-lg bg-blue-600 active:bg-blue-700 py-3 flex-1 mr-3 items-center">
          <Text className="text-white font-bold text-lg">Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-transparent border border-neutral-200 active:bg-neutral-100 rounded-lg py-3 flex-1 ml-3 items-center">
          <Text className="text-gray-900 font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
