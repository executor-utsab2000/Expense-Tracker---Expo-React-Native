import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import TopNavbar from "../Components/Fixed/TopNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const NameInsert = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    async function getData() {
      const userName = await AsyncStorage.getItem("userName");
      const userGender = await AsyncStorage.getItem("gender");

      setUserName(userName);
      setSelectedGender(userGender || null);
    }
    getData();
  }, []);

  const setStorageDataFunction = async () => {
    // console.log(selectedGender);
    if (userName.trim() == "") {
      Toast.show({
        type: "error",
        text1: "Check Blank Fields",
        text2: "Enter Username",
      });
      return;
    }
    //
    else if (selectedGender == null) {
      Toast.show({
        type: "error",
        text1: "Check Blank Fields",
        text2: "Select Gender",
      });
      return;
    }

    await AsyncStorage.setItem("userName", userName);
    await AsyncStorage.setItem("gender", selectedGender);
    navigation.navigate("home");
  };
  

  return (
    <>
      <SafeAreaView className="flex-1">
        <TopNavbar />
        <View className="h-[92%] flex items-center justify-center">
          <View className="w-[90%] px-4">
            <Text className="text-lg font-bold mb-2">Enter Item Name : </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md px-4 py-5 text-base bg-slate-50 font-semibold"
              placeholder="Enter Your Name"
              value={userName}
              onChangeText={setUserName}
            />

            <View className="flex justify-around flex-row py-8">
              <Pressable
                onPress={() => setSelectedGender("male")}
                className={`w-[45%] p-4 rounded-3xl flex flex-row border-2 ${
                  selectedGender === "male"
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                }`}
              >
                <Image
                  source={require("../../assets/manlogo.png")}
                  style={{
                    width: width * 0.1,
                    height: height * 0.03,
                    resizeMode: "contain",
                    marginRight: 10,
                  }}
                />
                <Text className="my-auto text-lg font-bold">Male</Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedGender("female")}
                className={`w-[45%] p-4 rounded-3xl flex flex-row border-2 ${
                  selectedGender === "female"
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                }`}
              >
                <Image
                  source={require("../../assets/femalelogo.png")}
                  style={{
                    width: width * 0.1,
                    height: height * 0.03,
                    resizeMode: "contain",
                    marginRight: 10,
                  }}
                />
                <Text className="my-auto text-lg font-bold">Female</Text>
              </Pressable>
            </View>

            <View className="flex flex-row justify-around mt-4 flex-wrap">
              <Pressable
                className="py-4 bg-red-600 w-[100%] rounded-3xl"
                onPress={setStorageDataFunction}
              >
                <Text className="text-center color-yellow-300 font-bold text-2xl">
                  Save Data
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Toast
        position="top" // or "top"
        topOffset={100} // keeps it above gesture bar
        visibilityTime={2000} // 2s then auto‑hide
      />
    </>
  );
};

export default NameInsert;
