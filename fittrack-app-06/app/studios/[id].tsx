import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function StudioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Studio ID</Text>
      <Text style={styles.value}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  label: { fontSize: 13, color: "#6b7280", textTransform: "uppercase" },
  value: { fontSize: 22, fontWeight: "700", marginTop: 4 },
});