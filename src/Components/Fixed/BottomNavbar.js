import React, { useState } from "react";
import { View, Dimensions, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      <View
        className="w-full bg-white h-[13%]  px-5 pb-12"
        style={style.bottomNavbar}
      >
        <View className="my-auto flex flex-row justify-around">
          <Pressable
            className="my-auto"
            onPress={() => navigation.navigate("home")}
          >
            <FontAwesome name="home" size={20} color="black" />
          </Pressable>

          <Pressable
            className="my-auto"
            onPress={() => navigation.navigate("list")}
          >
            <FontAwesome name="list" size={20} color="black" />
          </Pressable>


          <Pressable
            className="py-2 px-3 bg-[#778da9] rounded-full"
            onPress={() => setShowModel(true)}
          >
            <FontAwesome name="plus" size={30} color="black" />
          </Pressable>


          <Pressable className="my-auto" onPress={() => navigation.navigate("allRecords")}>
            <FontAwesome5 name="calendar-alt" size={20} color="black" />
          </Pressable>


          <Pressable
            className="my-auto"
            onPress={() => navigation.navigate("userProfile")}
          >
            <FontAwesome name="user" size={20} color="black" />
          </Pressable>
        </View>
      </View>

      {
        <Modal isVisible={showModel}>
          <View className="w-[80%] bg-white rounded-3xl m-auto relative py-5">
            <View className="p-5 ">
              <Text
                className="text-center py-5 bg-[#edede9] rounded-2xl font-bold mb-2"
                onPress={() => navigation.navigate("home")}
              >
                Add Expenses 💰💰
              </Text>
              <Text
                className="text-center py-5 bg-[#edede9] rounded-2xl font-bold mt-2"
                onPress={() => navigation.navigate("notepad")}
              >
                Add Notes ✒️✒️
              </Text>
            </View>

            <View className="p-3">
              <Pressable
                className="bg-red-600 py-3 rounded-3xl"
                onPress={() => setShowModel(false)}
              >
                <Text className="text-center color-amber-300 font-bold text-lg">
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      }
    </>
  );
};

const style = StyleSheet.create({
  bottomNavbar: {
    backgroundColor: "white", // important for shadow to render
    elevation: 10,
    borderTopColor: "#212121",
    borderTopWidth: 3,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default BottomNavbar;
