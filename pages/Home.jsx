import React from "react";
import {useState} from 'react';
import {
    Button,
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    View
} from 'react-native';
const Home = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
        // alert("La recherche est lancée !"); const url =
        // 'https://www.formacitron.com/games-api-fallback/games/';
        const apiKey = '971915818c334b32a8c506259da0ef51';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(
            searchText
        )}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setGames(data.results)
            })
            .catch(() => {
                alert('Une erreur est survenue')
            })
        }
    // On utilise un state pour garder nos données
    const [games, setGames] = useState(
        [/* { id:1, name:"Jeux 1", rating:4.6 },
        { id:2, name:"Jeux 2", rating:3.5 },
        { id:3, name:"Jeux 3", rating:4.2 },
        { id:4, name:"Jeux 4", rating:1.5 },
        { id:5, name:"Jeux 5", rating:3.7 },
        { id:6, name:"Jeux 6", rating:5 }*/]
    );
    const handleClick = slug => {
        navigation.push('Details', 'Shop', {slug});
    }

    return (
        <View style={style.page}>
            <View style={style.searchBar}>
                <TextInput
                    style={style.searchInput}
                    onChangeText={setSearchText}
                    value={searchText}></TextInput>
                <Button title="Chercher" onPress={handleSearch}></Button>
            </View>
            <FlatList
                style={style.list}
                data={games}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() => {
                            handleClick(item.slug)
                        }}>
                        <View style={style.listItem}>
                            <Image
                                source={{
                                    uri: item.background_image
                                }}
                                style={style.listImage}></Image>
                            <View>
                                <Text>{item.name}</Text>
                                <Text>Note: {item.rating}</Text>
                            </View>
                        </View>
                    </Pressable>

                )}
                keyExtractor={(item) => item.id}></FlatList>
            <Button
                title="Mes jeux"
                onPress={() => {
                    navigation.push('Bookmarks')
                }}></Button>
            <Button
                title="Aller au magasin"
                onPress={() => {
                    navigation.push('Shop')
                }}></Button>
            
        </View>
    );
};
const style = {
    page: {
        flex: 1,
        marginTop:40,
        
    },
    "searchBar": {
        flexDirection: "row", // flexbox en ligne
        
    },
    "searchInput": {
        flex: 1, // on occupe le plus d'espace
        borderWidth: 1, //on place une bordure
        borderColor: "#dddddd", // la bordure est gris clair
        
    },
    list: {
        flex: 1
    },
    listItem: {
        backgroundColor: '#e0e0e0',
        margin: 2,
        padding: 15,
        flexDirection: "row"
    },
    listImage: {
        width: 75,
        resizeMode: 'center',
        marginRight: 10
    },
    button:{
        paddingBottom:10,
    }
   
}
export default Home;
