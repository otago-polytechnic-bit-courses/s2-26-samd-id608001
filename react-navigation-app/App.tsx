import { View, Text } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Link } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const ExtraDataContext = React.createContext("");

function HomeScreen() {
  const navigation = useNavigation();
  const extraData = React.useContext(ExtraDataContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>{extraData}</Text>
      <Link screen="Details" params="Link">Go to Details</Link>
      <Button screen="Details" params="Button">Go to Details</Button>
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.push('Details')}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      <Button onPress={() => navigation.popTo('Home')}>Go to Home</Button>
      <Button onPress={() => navigation.popToTop()}>
        Go back to first screen in stack
      </Button>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Overview',
      },
    },
    Details: DetailsScreen,
  },
}).with(({ Navigator }) => {
  return (
    <ExtraDataContext.Provider value={"someData"}>
      <Navigator />
    </ExtraDataContext.Provider>
  );
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}