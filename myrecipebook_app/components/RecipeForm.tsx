import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IngredientInline from './IngredientInline';
import { DraftIngredient, RecipeValidationErrorState } from './lib/recipesApi';

interface RecipeFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  method: string;
  setMethod: (method: string) => void;
  ingredients: DraftIngredient[];
  setIngredients: (ingredients: DraftIngredient[]) => void;
  handleAddIngredient: () => void;
  disableInputs: boolean;
  errors?: RecipeValidationErrorState | null;
}

export default function RecipeForm({
  title,
  setTitle,
  description,
  setDescription,
  method,
  setMethod,
  ingredients,
  setIngredients,
  handleAddIngredient,
  disableInputs,
  errors,
}: RecipeFormProps) {
  const handleRemoveIngredient = (id: string | number | undefined) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  const updateIngredient = (
    id: string | number | undefined,
    field: keyof DraftIngredient,
    value: string,
  ) => {
    // Enforce positive numbers only for the amount field
    if (field === 'amount') {
      value = value.replace(/[^0-9.]/g, '');
    }

    setIngredients(
      ingredients.map(item =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const generalIngredientErrors = Array.isArray(errors?.ingredients)
    ? errors.ingredients
    : null;

  return (
    <ScrollView className="flex-1 px-5 pt-4">
      {/* Title Field */}
      <View className="mb-5">
        <TextInput
          className={`border rounded-lg p-3 text-base text-gray-900 ${
            errors?.title ? 'border-red-400 bg-red-50/20' : 'border-gray-400'
          }`}
          placeholder="Recipe Title"
          value={title}
          onChangeText={setTitle}
          editable={!disableInputs}
        />
        {errors?.title?.map((msg, index) => (
          <Text
            key={index}
            className="text-xs font-medium text-red-500 mt-1 pl-1">
            {msg}
          </Text>
        ))}
      </View>

      {/* Description Field */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Description</Text>
      <View className="mb-5">
        <TextInput
          className={`border rounded-lg p-3 text-base text-gray-900 h-28 ${
            errors?.description
              ? 'border-red-400 bg-red-50/20'
              : 'border-gray-400'
          }`}
          placeholder="Describe your recipe here!"
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
          editable={!disableInputs}
        />
        {errors?.description?.map((msg, index) => (
          <Text
            key={index}
            className="text-xs font-medium text-red-500 mt-1 pl-1">
            {msg}
          </Text>
        ))}
      </View>

      {/* Ingredients Section */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Ingredients</Text>

      {generalIngredientErrors?.map((msg, index) => (
        <Text
          key={index}
          className="text-xs font-medium text-red-500 mb-2 pl-1">
          {msg}
        </Text>
      ))}

      <View className="flex-row px-1 mb-1">
        <Text className="text-xs text-gray-600 flex-[0.25]">Amount</Text>
        <Text className="text-xs text-gray-600 flex-[0.35] ml-2">
          Measurement
        </Text>
        <Text className="text-xs text-gray-600 flex-[0.5] ml-2">
          Ingredient name
        </Text>
        <View className="w-8" />
      </View>

      {/* Map Ingredients and pass individual row errors by index */}
      {ingredients.map((ingredient, index) => {
        const rowErrors =
          typeof errors?.ingredients === 'object' &&
          !Array.isArray(errors.ingredients)
            ? errors.ingredients[index.toString()]
            : undefined;

        return (
          <IngredientInline
            key={ingredient.id}
            ingredient={ingredient}
            updateIngredient={updateIngredient}
            handleRemoveIngredient={handleRemoveIngredient}
            showRemove={ingredients.length > 1}
            disableInputs={disableInputs}
            errors={rowErrors}
          />
        );
      })}

      <TouchableOpacity
        onPress={handleAddIngredient}
        className="rounded-lg px-4 py-2 self-start mb-6 bg-blue-600 active:bg-blue-700">
        <Text className="text-white font-semibold text-sm">Add Ingredient</Text>
      </TouchableOpacity>

      {/* Method Field */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Method</Text>
      <View className="mb-8">
        <TextInput
          className={`border rounded-lg p-3 text-base text-gray-900 h-32 ${
            errors?.method ? 'border-red-400 bg-red-50/20' : 'border-gray-400'
          }`}
          placeholder="Add your method here!"
          multiline
          textAlignVertical="top"
          value={method}
          onChangeText={setMethod}
          editable={!disableInputs}
        />
        {errors?.method?.map((msg, index) => (
          <Text
            key={index}
            className="text-xs font-medium text-red-500 mt-1 pl-1">
            {msg}
          </Text>
        ))}
      </View>

      {/* Global Non-Field Errors */}
      {errors?.non_field_errors?.map((msg, index) => (
        <Text
          key={index}
          className="text-sm font-medium text-red-500 mb-4 text-center">
          {msg}
        </Text>
      ))}
    </ScrollView>
  );
}
