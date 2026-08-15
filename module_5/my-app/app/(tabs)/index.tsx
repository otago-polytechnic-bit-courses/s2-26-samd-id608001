import { Button, StyleSheet, TextInput, View } from 'react-native';
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




export default function HomeScreen() {
  const [studios, setStudios] = useState<Studio[]>([
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
  ]);
  const [query, setQuery] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [suburb, setSuburb] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const filtered: Studio[] = studios.filter((studio) =>
    studio.name.toLowerCase().includes(query.toLowerCase()) ||
    studio.suburb.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
          placeholder="Search studios"
          value={query}
          style={styles.input}
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
      <Button 
        title={isVisible ? "Hide Add Studio" : "Show Add Studio"}
        onPress={() => setIsVisible(!isVisible)} 
      />
      {isVisible && (
        <View 
          style={styles.container}>
          <TextInput
            placeholder="Name"
            value={name}
            style={styles.input}
            onChangeText={setName} />
          <TextInput
            placeholder="Suburb"
            value={suburb}
            style={styles.input}
            onChangeText={setSuburb} />
          <Button 
            title="Add Studio"
            onPress={() => { 
                setStudios([...studios, {
                  id: `${studios.length+1}`,
                  name: name,
                  suburb: suburb,
                  city: 'Dunedin',
                  isFavourite: false
                }]);
                setName("");
                setSuburb("");
              }
            } 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 4 }
});
