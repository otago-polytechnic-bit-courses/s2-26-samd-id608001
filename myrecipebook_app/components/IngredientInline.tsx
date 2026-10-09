import { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DraftIngredient, IngredientValidationError } from './lib/recipesApi';

interface IngredientInlineProps {
  ingredient: DraftIngredient;
  updateIngredient: (
    id: string | number | undefined,
    field: keyof DraftIngredient,
    value: string,
  ) => void;
  handleRemoveIngredient: (id: string | number | undefined) => void;
  showRemove: boolean;
  errors?: IngredientValidationError;
}

export default function IngredientInline({
  ingredient,
  updateIngredient,
  handleRemoveIngredient,
  showRemove,
  errors,
}: IngredientInlineProps) {
  const dropdownRef = useRef<any>(null);
  return (
    <View className="flex-row items-start mb-3">
      {/* Amount Column */}
      <View className="flex-[0.25]">
        <TextInput
          className={`border rounded-lg p-2 text-base text-gray-900 ${
            errors?.amount ? 'border-red-400 bg-red-50/20' : 'border-gray-400'
          }`}
          placeholder="1"
          keyboardType="decimal-pad"
          value={`${ingredient.amount}`}
          onChangeText={val => updateIngredient(ingredient.id, 'amount', val)}
        />
        {errors?.amount?.map((msg, idx) => (
          <Text
            key={idx}
            className="text-[10px] font-medium text-red-500 mt-0.5 pl-0.5">
            {msg}
          </Text>
        ))}
      </View>

      {/* Measurement Column */}
      <View className="flex-[0.35] ml-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => dropdownRef.current?.open()}
          className={`border rounded-lg h-[38px] justify-center ${
            errors?.measurement
              ? 'border-red-400 bg-red-50/20'
              : 'border-gray-400'
          }`}>
          <Dropdown
            ref={dropdownRef}
            style={{ paddingHorizontal: 8, height: '100%' }}
            containerStyle={{ width: 140, borderRadius: 8, marginTop: 2 }}
            dropdownPosition="bottom"
            placeholderStyle={{ fontSize: 16, color: '#9ca3af' }}
            selectedTextStyle={{ fontSize: 16, color: '#111827' }}
            itemTextStyle={{ fontSize: 16, color: '#111827' }}
            data={[
              { label: 'Cup', value: 'cup' },
              { label: 'Whole', value: 'whole' },
              { label: 'g', value: 'grams' },
              { label: 'ml', value: 'millilitre' },
              { label: 'tsp', value: 'teaspoon' },
              { label: 'Tbsp', value: 'tablespoon' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="Cup"
            value={ingredient.measurement}
            onChange={item =>
              updateIngredient(ingredient.id, 'measurement', item.value)
            }
          />
        </TouchableOpacity>
        {errors?.measurement?.map((msg, idx) => (
          <Text
            key={idx}
            className="text-[10px] font-medium text-red-500 mt-0.5 pl-0.5">
            {msg}
          </Text>
        ))}
      </View>

      {/* Ingredient Name Column */}
      <View className="flex-[0.5] ml-2">
        <TextInput
          className={`border rounded-lg p-2 text-base text-gray-900 ${
            errors?.ingredient_name
              ? 'border-red-400 bg-red-50/20'
              : 'border-gray-400'
          }`}
          placeholder="Flour"
          value={ingredient.ingredient_name}
          onChangeText={val =>
            updateIngredient(ingredient.id, 'ingredient_name', val)
          }
        />
        {errors?.ingredient_name?.map((msg, idx) => (
          <Text
            key={idx}
            className="text-[10px] font-medium text-red-500 mt-0.5 pl-0.5">
            {msg}
          </Text>
        ))}
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => handleRemoveIngredient(ingredient.id)}
        className="w-8 h-[38px] items-center justify-center ml-1">
        {showRemove && (
          <Text className="text-lg text-gray-500 font-bold">x</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
