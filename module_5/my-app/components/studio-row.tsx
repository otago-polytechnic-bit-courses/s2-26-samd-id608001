import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface StudioRowProps {
  name: string;
  suburb: string;
  city: string;
};

export function StudioRow({
  name,
  suburb,
  city,
}: StudioRowProps) {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    return (
        <View style={styles.card}>
        <View style={styles.thumbnail} />

        <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.meta}>
            {suburb}, {city}
            </Text>
        </View>

        <Pressable onPress={() => {setIsFavourite(!isFavourite)}}>
            <Text style={styles.heart}>{isFavourite ? "♥" : "♡"}</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 16, alignItems: "center" },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#2BBCED",
  },
  details: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 14, color: "#6b7280" },
  heart: {
    fontSize: 30
  }
});