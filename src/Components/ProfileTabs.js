import React from "react";
import { Text, View, Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileTabs = ({ title = "", value = 0, ifShowDetails = false , navigateTo =''  }) => {
  const navigation = useNavigation();
  return (
    <View
      className=" p-5 rounded-3xl bg-slate-400 my-3 overflow-hidden w-[90%] flex flex-row justify-between"
      style={{ elevation: 5 }}
    >
      <View>
        <Text className="font-extrabold text-xl">{title} :</Text>
        <Text className="font-bold text-l mt-2">{value}</Text>
      </View>
      {ifShowDetails && (
        <Pressable className="my-auto pr-5 flex items-center"  onPress={() => navigation.navigate(navigateTo)}>
          <FontAwesome5 name="eye" size={20} color="#fefae0" />
          <Text className="color-[#fefae0] mt-2 font-bold">View Details</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ProfileTabs;
