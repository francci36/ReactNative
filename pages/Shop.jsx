import React,{useEffect, useState} from 'react';
import {StyleSheet, View, Text } from 'react-native';
/*import haversine from 'haversine-distance';
import * as Location from 'expo-location';*/

const Shop = () => {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetch('https://www.formacitron.com/gps-api/selection.json')
          .then((response) => response.json())
          .then((data) => setCities(data));
      }, [])
    return (
        <View style={styles.container}>
        {cities.map((city) => (
          <View key={city.id} style={styles.city}>
            <Text style={styles.name}>{city.name}</Text>
          </View>
        ))}
      </View>
      
      );
     
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  export default Shop;

