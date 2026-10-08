import { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ingredient } from './lib/recipesApi';

interface IngredientInlineProps {
  ingredient: Ingredient;
  updateIngredient: (id: string, field: string, value: string) => void;
  handleRemoveIngredient: (idToRemove: string) => void;
  showRemove: boolean;
}

export default function IngredientInline({
  ingredient,
  updateIngredient,
  handleRemoveIngredient,
  showRemove,
}: IngredientInlineProps) {
  const dropdownRef = useRef<any>(null);
  return (
    <View className="flex-row items-center mb-3">
      <TextInput
        className="border border-gray-400 rounded-lg p-2 text-base text-gray-900 flex-[0.25]"
        placeholder="1"
        keyboardType="numeric"
        value={ingredient.amount}
        onChangeText={val => updateIngredient(ingredient.id, 'amount', val)}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dropdownRef.current?.open()}
        className="border border-gray-400 rounded-lg flex-[0.35] ml-2 h-[38px] justify-center">
        <Dropdown
          ref={dropdownRef}
          style={{
            paddingHorizontal: 8,
            height: '100%',
          }}
          containerStyle={{
            width: 140,
            borderRadius: 8,
            marginTop: 2,
          }}
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
          onChange={item => {
            updateIngredient(ingredient.id, 'measurement', item.value);
          }}
        />
      </TouchableOpacity>

      <TextInput
        className="border border-gray-400 rounded-lg p-2 text-base text-gray-900 flex-[0.5] ml-2"
        placeholder="Flour"
        value={ingredient.name}
        onChangeText={val => updateIngredient(ingredient.id, 'name', val)}
      />

      <TouchableOpacity
        onPress={() => handleRemoveIngredient(ingredient.id)}
        className="w-8 items-center justify-center ml-1">
        {showRemove && (
          <Text className="text-lg text-gray-500 font-bold">x</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
