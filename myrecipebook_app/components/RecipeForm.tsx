import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IngredientInline from './IngredientInline';
import { Ingredient } from './lib/recipesApi';

interface RecipeFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  method: string;
  setMethod: (method: string) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  handleAddIngredient: () => void;
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
}: RecipeFormProps) {
  const handleRemoveIngredient = (idToRemove: string) => {
    setIngredients(ingredients.filter(item => item.id !== idToRemove));
  };

  const updateIngredient = (id: string, field: string, value: string) => {
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
  return (
    <ScrollView className="flex-1 px-5 pt-4">
      {/* Recipe Title */}
      <TextInput
        className="border border-gray-400 rounded-lg p-3 text-base text-gray-900 mb-5"
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Description</Text>
      <TextInput
        className="border border-gray-400 rounded-lg p-3 text-base text-gray-900 h-28 mb-5"
        placeholder="Describe your recipe here!"
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      {/* Ingredients Section */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Ingredients</Text>

      {/* Column Headers */}
      <View className="flex-row px-1 mb-1">
        <Text className="text-xs text-gray-600 flex-[0.3]">Amount</Text>
        <Text className="text-xs text-gray-600 flex-[0.35] ml-2">
          Measurement
        </Text>
        <Text className="text-xs text-gray-600 flex-[0.5] ml-2">
          Ingredient name
        </Text>
        <View className="w-8" />
        {/* Spacer for the X button */}
      </View>

      {/* Dynamic Ingredient Rows */}
      {ingredients.map(ingredient => (
        <IngredientInline
          key={ingredient.id}
          ingredient={ingredient}
          updateIngredient={updateIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          showRemove={ingredients.length > 1}
        />
      ))}

      {/* Add Ingredient Button */}
      <TouchableOpacity
        onPress={handleAddIngredient}
        className="rounded-lg px-4 py-2 self-start mb-6 bg-blue-600 active:bg-blue-700">
        <Text className="text-white font-semibold text-sm">Add Ingredient</Text>
      </TouchableOpacity>

      {/* Method */}
      <Text className="text-xl font-bold text-gray-800 mb-2">Method</Text>
      <TextInput
        className="border border-gray-400 rounded-lg p-3 text-base text-gray-900 h-32 mb-8"
        placeholder="Add your method here!"
        multiline
        textAlignVertical="top"
        value={method}
        onChangeText={setMethod}
      />
    </ScrollView>
  );
}
