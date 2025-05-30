import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Article = {
  title: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
  url: string;
  description: string | null;
  content: string | null;
};

const cantidadNoticias = 8;

export default function HomeScreen({ navigation, modoOscuroActivo, toggleModoOscuro }: Props & { modoOscuroActivo: boolean; toggleModoOscuro: () => void }) {
  const [noticiasData, setNoticiasData] = useState<Article[]>([]);
  const [noticiasVisibles, setNoticiasVisibles] = useState<Article[]>([]);
  const [temaActual, setTemaActual] = useState('Tecnología');
  const [busquedaActual, setBusquedaActual] = useState('');

  const colorScheme = useColorScheme();

  useEffect(() => {
    cargarNoticias(temaActual, busquedaActual);
  }, []);

  const fetchNoticias = (categoria: string, busqueda = '') => {
    let q = categoria;
    if (busqueda) {
      q += ' ' + busqueda;
    }
    const apiKey = '1abc427072a3401bb6a156d351c3d30e';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNoticiasData(data.articles || []);
        setNoticiasVisibles((data.articles || []).slice(0, cantidadNoticias));
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  };

  const cargarNoticias = (cat: string, busqueda = '') => {
    setTemaActual(cat);
    setBusquedaActual(busqueda);
    fetchNoticias(cat, busqueda);
  };

  const siguiente = () => {
    const currentLength = noticiasVisibles.length;
    const moreNoticias = noticiasData.slice(
      currentLength,
      currentLength + cantidadNoticias
    );
    setNoticiasVisibles([...noticiasVisibles, ...moreNoticias]);
  };

  const renderItem = ({ item }: { item: Article }) => {
    const date = item.publishedAt
      ? item.publishedAt.split('T')[0].split('-').reverse().join('-')
      : '';
    return (
      <TouchableOpacity
        style={[
          styles.item,
          modoOscuroActivo ? styles.itemDark : styles.itemLight,
        ]}
        onPress={() => navigation.navigate('Details', { noticia: item, modoOscuroActivo })}
      >
        <Text style={[styles.title, modoOscuroActivo && styles.titleDark]}>
          {item.title}
        </Text>
        {item.urlToImage ? (
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        ) : null}
        <View style={styles.infoItem}>
          <Text style={[styles.fecha, modoOscuroActivo && styles.textDark]}>
            {date}
          </Text>
          <Text style={[styles.fuente, modoOscuroActivo && styles.textDark]}>
            {item.source ? item.source.name : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, modoOscuroActivo && styles.containerDark]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.inputBusqueda, modoOscuroActivo && styles.inputDark]}
          placeholder="Buscar noticias..."
          placeholderTextColor={modoOscuroActivo ? '#ccc' : '#888'}
          value={busquedaActual}
          onChangeText={setBusquedaActual}
          onSubmitEditing={() => cargarNoticias(temaActual, busquedaActual)}
        />
        <Button
          title="Modo Oscuro"
          onPress={toggleModoOscuro}
          color={modoOscuroActivo ? '#bb86fc' : undefined}
         />
      </View>

      <FlatList
        data={noticiasVisibles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          styles.containerNoticias,
          modoOscuroActivo && styles.containerNoticiasDark,
        ]}
        numColumns={4}
      />

      {noticiasVisibles.length < noticiasData.length && (
        <View style={styles.buttonContainer}>
          <Button
            title="Ver más"
            onPress={siguiente}
            color={modoOscuroActivo ? '#bb86fc' : undefined}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  inputBusqueda: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#000',
  },
  inputDark: {
    borderColor: '#555',
    color: '#eee',
  },
  containerNoticias: {
    paddingBottom: 20,
    backgroundColor: '#f5f7fa',
  },
  containerNoticiasDark: {
    paddingBottom: 20,
    backgroundColor: '#121212',
  },
  buttonContainer: {
    width: 120,
    alignSelf: 'center',
    marginVertical: 10,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 5,
    flexBasis: '23%',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minHeight: 260,
    justifyContent: 'space-between',
  },
  itemDark: {
    backgroundColor: '#1e1e1e',
  },
  itemLight: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    minHeight: 60,
  },
  titleDark: {
    color: '#bb86fc',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fecha: {
    fontSize: 12,
    color: '#666',
  },
  fuente: {
    fontSize: 12,
    color: '#666',
  },
  textDark: {
    color: '#ccc',
  },
});
