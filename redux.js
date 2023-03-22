import AsyncStorage from "@react-native-async-storage/async-storage";
import {configureStore, createSlice} from "@reduxjs/toolkit";

const gameSlices = createSlice({
    name: 'game', // Une slice doit être nommée
    initialState: [
        { // Et contenir l'état tel qu'on le souhaite au démarrage
            "slug": "super-mario-kart",
                "name": "Super Mario Kart",
                "background_image":
            "https://media.rawg.io/media/games/4da/4da63441cb94d7adb4d954871b65db30.jpg",
                "id": 24478,
                },
                {
                "slug": "super-mario-bros",
                "name": "Super Mario Bros.",
                "background_image":
            "https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
                "id": 25080,
        }
    ],
    reducers: {
        replaceAll: (state, action) => {
            state = action.payload;
            return state;
        },
        // Les reducers suivants seront ajoutés ici
        addGame: (state, action) => {
            state.push(action.payload); // on ajoute le jeu au state
            save(state);
            return state;
             // on retourne le nouveau state
        },
        removeGame: (state, action) => {
            const index = state.findIndex(game => game.id === action.payload.id);
            if (index !== -1) {
              state.splice(index, 1);
              save(state);
              return state;
        } 
    }     
    },
});
export const store = configureStore({
    reducer: {
        games: gameSlices.reducer
    }

})
const save = (bookmarks) => {
    AsyncStorage
        .setItem('bookmarks', JSON.stringify(bookmarks))
        .then(() => {
            console.log('Sauvegarde ok');
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
