import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
import { getStudios, Studio } from "../components/studiosApi";

export default function StudiosScreen() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudios().then((data) => {
      setStudios(data);
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
    <FlatList
      contentContainerStyle={styles.list}
      data={studios}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Link href={`/studios/${item.id}`} style={styles.row}>
          <Text style={styles.rowText}>{item.name}</Text>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d1d5db",
  },
  rowText: { fontSize: 16, fontWeight: "500" },
});