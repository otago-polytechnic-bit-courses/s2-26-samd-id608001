import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getRecipe, Recipe } from "../../components/lib/recipesApi";

export default function StudioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecipe(id).then((data) => {
      setRecipe(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError("An Error occurred while fetching studios!");
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error !== null) {
    return <Text>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe ID</Text>
      <Text style={styles.value}>{id}</Text>

      <Text style={styles.label}>Recipe Title</Text>
      <Text style={styles.value}>{recipe?.title}</Text>

      <Text style={styles.label}>Recipe Description</Text>
      <Text style={styles.value}>{recipe?.description}</Text>

      <Text style={styles.label}>Recipe Method</Text>
      <Text style={styles.value}>{recipe?.method}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  label: { fontSize: 13, color: "#6b7280", textTransform: "uppercase" },
  value: { fontSize: 22, fontWeight: "700", marginTop: 4 },
});