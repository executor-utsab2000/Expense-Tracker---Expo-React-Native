import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import Toast from "react-native-toast-message";

const NotePad = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [userNotes, setUserNotes] = useState(null);

  useEffect(() => {
    async function getUserNameNotes() {
      const uName = await AsyncStorage.getItem("userName");
      const uNotes = await AsyncStorage.getItem("userNotes");
      setUserName(uName);
      setUserNotes(uNotes);
    }

    getUserNameNotes();
  }, []);

  const saveNotes = async () => {
    await AsyncStorage.setItem("userNotes", userNotes);
    Toast.show({
      type: "success",
      text1: "Saved",
      text2: "Notes Saved Successfully",
    });
  };

  return (
    <>
      <ProjectLayout>
        <View className="h-[20%] pt-10 pb-3 px-8">
          <Text className="text-xl">𝑯𝒊 ,</Text>
          <Text className="font-extrabold text-3xl italic pt-2">
            {userName}
          </Text>
          <Text className="font-extrabold text-xl italic pt-2">
            𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒃𝒂𝒄𝒌 , 𝑻𝒂𝒌𝒆 𝒀𝒐𝒖𝒓 𝑵𝒐𝒕𝒆𝒔 ✒️✒️✒️
          </Text>
        </View>

        <View className="flex-1 h-[70%] px-8 py-4">
          <TextInput
            placeholder="Enter Notes"
            placeholderTextColor="#888"
            multiline
            scrollEnabled
            className="flex-1 text-base px-5 w-full border border-gray-300 rounded-md py-5 bg-slate-50 font-semibold"
            style={{
              textAlignVertical: "top",
            }}
            value={userNotes}
            onChangeText={setUserNotes}
          />
        </View>

        <View className="h-[10%] w-[90%] m-auto px-8">
          <Pressable
            className="py-4 bg-red-600 w-[100%] rounded-3xl"
            onPress={saveNotes}
          >
            <Text className="text-center color-yellow-300 font-bold text-xl">
              {" "}
              Save Note
            </Text>
          </Pressable>
        </View>
      </ProjectLayout>

      <Toast
        position="top" // or "top"
        topOffset={100} // keeps it above gesture bar
        visibilityTime={2000} // 2 s then auto‑hide
      />
    </>
  );
};

export default NotePad;
