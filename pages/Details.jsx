import {useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

export default function Details({route}) {
  

    const [game, setGame] = useState(null);
    const apiKey = "971915818c334b32a8c506259da0ef51";

    useEffect(() => {
        const slug = route.params.slug;
        const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setGame(data);
            })
            .catch(() => {
                alert("Une erreur est survenue");
            });
    }, [route.params.slug]);
    const Bookmarks = useSelector((state) => state.games)
    const dispatch = useDispatch();

    const handlePressAdd = () => {
        dispatch({
            type: 'game/addGame',
            payload: {
                "slug": game.slug,
                "name": game.name,
                "background_image": game.background_image,
                "id": game.id
            }
        });
    }
    const handlePressRemove = () => {
        dispatch({type: 'game/removeGame', payload: game.id});
    };
    // Vérifier si le jeu en cours est dans les bookmarks
    const isBookmarked = () => Bookmarks.find(bookmark => bookmark.id == game.id) !== undefined;
    return (
        <View style={style.page}>
            {
                game && (
                    <View>
                        <Text>Nom : {game.name}</Text>
                        <Text>Date de sortie : {game.released}</Text>
                        <Text>Description : {game.description_raw}</Text>
                        {
                            isBookmarked()
                                ? (<Button title="⭐ Retirer" onPress={handlePressRemove}></Button>)
                                : (<Button title="⭐ Ajouter" onPress={handlePressAdd}></Button>)
                        }
                    </View>
                )
            }
        </View>
    );
}

const style = {
    page: {
        flex: 1
    }
};
