import { StyleSheet, TextInput } from 'react-native';
import { FlatList } from "react-native";
import { StudioRow } from '@/components/studio-row';
import { useState } from 'react';

interface Studio {
  id: string;
  name: string;
  suburb: string;
  city: string;
  isFavourite: boolean,
};

const studios: Studio[] = [
  { 
    id: "1",
    name: "CityFit",
    suburb: "Dunedin Central",
    city: "Dunedin",
    isFavourite: false,
  },
  { 
    id: "2", 
    name: "Harbourside Yoga", 
    suburb: "St Kilda", 
    city: "Dunedin",
    isFavourite: false,
  },
  {
    id: "3",
    name: "Northside Strength",
    suburb: "North Dunedin",
    city: "Dunedin",
    isFavourite: false,
  },
  { 
    id: "4", 
    name: "Un-fit", 
    suburb: "St Clair", 
    city: "Dunedin",
    isFavourite: false,
  },
  {
    id: "5",
    name: "Northside Weak",
    suburb: "Leith Valley",
    city: "Dunedin",
    isFavourite: false,
  },
];


export default function HomeScreen() {
  const [query, setQuery] = useState<string>("");

  const filtered: Studio[] = studios.filter((studio) =>
    studio.name.toLowerCase().includes(query.toLowerCase()) ||
    studio.suburb.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <TextInput
          placeholder="Search studios"
          value={query}
          style={styles.container}
          onChangeText={setQuery}
        />  
      <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          style={styles.container}
          renderItem={({ item }) => (
            <StudioRow name={item.name} suburb={item.suburb} city={item.city} />
          )}
        />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  }
});
