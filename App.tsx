import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { noticia: {
    title: string;
    urlToImage: string | null;
    publishedAt: string;
    source: { name: string };
    url: string;
    description: string | null;
    content: string | null;
  }; modoOscuroActivo: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [modoOscuroActivo, setModoOscuroActivo] = useState(false);

  const toggleModoOscuro = () => {
    setModoOscuroActivo(!modoOscuroActivo);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: modoOscuroActivo ? '#121212' : '#fff',
          },
          headerTintColor: modoOscuroActivo ? '#bb86fc' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: 'NewsNow' }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              modoOscuroActivo={modoOscuroActivo}
              toggleModoOscuro={toggleModoOscuro}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Descripcion Noticia' }}
          initialParams={{ modoOscuroActivo }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
