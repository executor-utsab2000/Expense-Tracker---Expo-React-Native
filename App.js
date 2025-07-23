import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "./src/CSS/global.css"; // NOTE: CSS like this only works in Expo with Tailwind/nativewind setup
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddForm from "./src/Pages/AddForm";
import ListExpense from "./src/Pages/ListExpense";
import AppOpenShowModalContextProvider from "./src/Context/AppOpenShowModalContextProvider";
import NameInsert from "./src/Pages/NameInsert";
import WelcomeScreen from "./src/Pages/WelcomeScreen";
import LoadingScreen from "./src/Pages/LoadingScreen";
import NotePad from "./src/Pages/NotePad";
import UserProfile from "./src/Pages/UserProfile";
import AllRecords from "./src/Pages/AllRecords";
import { monthAllRecords } from "./src/JS/monthAllRecords";
import { dummyData } from "./src/JS/dummyData";
const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => { 
    async function conditionallySetRoute() {
      // console.log(await AsyncStorage.getAllKeys());
      // ------------------------------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------------------------
      // await AsyncStorage.setItem('allTodoList' , JSON.stringify(dummyData))
      // await AsyncStorage.removeItem("allTodoList");
      // await AsyncStorage.removeItem("userNotes");
      // await AsyncStorage.removeItem("todoList");
      // await AsyncStorage.removeItem("userName");
      // await AsyncStorage.removeItem("gender");
      // await AsyncStorage.removeItem("budget");

      // ------------------------------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------------------------
      const userName = await AsyncStorage.getItem("userName");
      // console.log("AsyncStorage userName:", userName);
      if (userName == null) {
        setInitialRoute("nameInsert");
      } else {
        setInitialRoute("welcomeScreen");
      }
    }

    conditionallySetRoute();
    // ------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------
    //  ["allTodoList", "gender", "todoList", "userName", "userNotes"]
    async function onFirstTheActions() {
      // function onFirstTheActions() {
      const today = new Date();
      const date = today.getDate();
      // // console.log(date);
      // const date = 1;

      if (date == 1) {
        const monthNumber = today.getMonth();
        const monthDetails = monthAllRecords.find((elm) => monthNumber - 1 == elm.monthCount);
        const getYear = today.getFullYear();
        // console.log(getYear);

        const getAllRecords = JSON.parse(
          await AsyncStorage.getItem("allTodoList")
        );
        let monthRecord = JSON.parse(await AsyncStorage.getItem("todoList"));
        let budget = await AsyncStorage.getItem("budget");

        if (monthRecord.length != 0) {
          const total = monthRecord.reduce((result, currVal) => result + Number(currVal.amount), 0);
          const remaining = Number(budget) - total;

          const newMonthRecord = {
            id: `${monthDetails.monthAbbr}${getYear}`,
            title: `${monthDetails.monthName} ${getYear}`,
            todos: [...monthRecord],
            budgetSet: budget,
            remainingAmount : remaining 
          };

          // console.log(newMonthRecord);
          

          let newUpdatedAllTodos;
          if (getAllRecords != null) {
            newUpdatedAllTodos = [newMonthRecord, ...getAllRecords];
          } else if (getAllRecords == null) {
            newUpdatedAllTodos = [newMonthRecord];
          }

          await AsyncStorage.setItem("allTodoList", JSON.stringify(newUpdatedAllTodos));
          await AsyncStorage.removeItem("todoList");
          await AsyncStorage.removeItem("budget");
        }
      }
      // console.log(4);
      
    }
    onFirstTheActions();
  }, []);

  if (!initialRoute) {
    return <LoadingScreen />; // Or splash screen
  }

  return (
    <AppOpenShowModalContextProvider>
      <View className="bg-[#d0d4d9] flex-1">
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={initialRoute}> */}
          <Stack.Navigator initialRouteName="list">
            <Stack.Screen
              name="nameInsert"
              component={NameInsert}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="welcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="home"
              component={AddForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="notepad"
              component={NotePad}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="list"
              component={ListExpense}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="allRecords"
              component={AllRecords}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="userProfile"
              component={UserProfile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppOpenShowModalContextProvider>
  );
};

export default App;
// options={{ headerShown: false }} is used to make the headers that gets created to hide
