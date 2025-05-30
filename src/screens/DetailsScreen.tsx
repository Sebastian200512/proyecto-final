import React from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { noticia, modoOscuroActivo } = route.params;

  return (
    <ScrollView style={[styles.container, modoOscuroActivo && styles.containerDark]}>
      <Text style={[styles.title, modoOscuroActivo && styles.titleDark]}>{noticia.title}</Text>
      {noticia.urlToImage ? (
        <Image source={{ uri: noticia.urlToImage }} style={styles.image} />
      ) : null}
      <Text style={[styles.description, modoOscuroActivo && styles.textDark]}>{noticia.description || ''}</Text>
      <Text style={[styles.content, modoOscuroActivo && styles.textDark]}>{noticia.content || ''}</Text>
      <Text style={[styles.link, modoOscuroActivo && styles.linkDark]} onPress={() => Linking.openURL(noticia.url)}>
        Leer más
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#000',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  titleDark: {
    color: '#bb86fc',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    marginBottom: 15,
  },
  link: {
    color: '#007bff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  linkDark: {
    color: '#bb86fc',
  },
  textDark: {
    color: '#ccc',
  },
});
