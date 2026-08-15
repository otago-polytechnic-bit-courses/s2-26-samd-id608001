import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getStudio, Studio } from "../../components/studiosApi";

export default function StudioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [studio, setStudio] = useState<Studio>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudio(id).then((data) => {
      setStudio(data);
      setLoading(false);
    }).catch((error) => {
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
      <Text style={styles.label}>Studio ID</Text>
      <Text style={styles.value}>{id}</Text>

      <Text style={styles.label}>Studio Name</Text>
      <Text style={styles.value}>{studio.name}</Text>

      <Text style={styles.label}>Studio suburb</Text>
      <Text style={styles.value}>{studio.suburb}</Text>

      <Text style={styles.label}>Studio City</Text>
      <Text style={styles.value}>{studio.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  label: { fontSize: 13, color: "#6b7280", textTransform: "uppercase" },
  value: { fontSize: 22, fontWeight: "700", marginTop: 4 },
});