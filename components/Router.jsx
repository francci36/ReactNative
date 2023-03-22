import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Shop from "../pages/Shop";
import Bookmarks from "../pages/Bookmark";
import Details from "../pages/Details";
import Home from "../pages/Home";



const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        AsyncStorage.getItem("bookmarks")
        .then((bookmarks) => {
            const games = JSON.parse("bookmarks");
            if(bookmarks !== null) dispatch({type:'game/replaceAll', payload:games})
        });
    },[])
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false
                    }}/>
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        title: "Détails"
                    }}/>
                <Stack.Screen
                    name="Bookmarks"
                    component={Bookmarks}
                    options={{
                        title: "Mes jeux"
                    }}/>
                <Stack.Screen
                    name="Shop"
                    component={Shop}
                    options={{
                        title: "Boutique"
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Router;
