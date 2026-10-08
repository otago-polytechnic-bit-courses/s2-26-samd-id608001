import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router, } from "expo-router";

export default function RecipeListScreen() {
  const handleCreateNavigation = () => {
      router.push({ pathname: '/recipes/create' });
    };

  return (
    <View style={styles.container}>
      <Text>Recipes to be listed here!</Text>
      <TouchableOpacity 
        onPress={handleCreateNavigation}
        className="flex-1 h-12 rounded-lg items-center justify-center bg-transparent border border-neutral-200 active:bg-neutral-100"
      >
        <Text className="text-neutral-600 text-base font-medium">Create a Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});