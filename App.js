import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";

import common from "./common";
import RoomScreen from "./containers/RoomScreen";
import ArroundMeScreen from "./containers/ArroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [swipeImage, setSwipeImage] = useState([]);
  const [userId, setUserId] = useState(null);

  const setToken = async token => {
    if (token !== null) {
      AsyncStorage.setItem("userToken", token);
      // AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userToken");
      // AsyncStorage.removeItem("userId");
    }

    setUserToken(token);
    // setUserId(id);
  };

  const setId = async id => {
    console.log("coucou id", id);
    if (id !== null) {
      AsyncStorage.setItem("userId", id);
      // AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
      // AsyncStorage.removeItem("userId");
    }

    setUserId(id);
    // setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer style={{ backgroundColor: "#F35960" }}>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              title: "SIGN UP",

              headerStyle: {
                backgroundColor: common.redbackground
              },
              headerTitleStyle: { color: "white" }
            }}
          >
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#000",
                  inactiveTintColor: "#FFF",
                  style: {
                    backgroundColor: common.redbackground
                  }
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Mon Airbnb",

                          tabBarLabel: "Home",
                          headerStyle: {
                            backgroundColor: common.redbackground
                          },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerBackTitleVisible: false,
                          headerStyle: {
                            backgroundColor: common.redbackground
                          },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {props => (
                          <RoomScreen
                            {...props}
                            swipeImage={swipeImage}
                            setSwipeImage={setSwipeImage}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="ArroundMe"
                  options={{
                    tabBarLabel: "ArroundMe",

                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name={"map-marker-outline"}
                        size={size}
                        color={color}
                      />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="ArroundMe"
                        options={{
                          title: "Arround me",
                          tabBarLabel: "ArroundMe",
                          headerStyle: {
                            backgroundColor: common.redbackground
                          },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <ArroundMeScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name={"user"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{ title: "Profile", tabBarLabel: "Profile" }}
                      >
                        {() => (
                          <ProfileScreen
                            setToken={setToken}
                            userToken={userToken}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
