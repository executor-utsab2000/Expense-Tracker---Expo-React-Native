import React from "react";
import { View, Image, Dimensions, Text, Pressable } from "react-native";

const { width, height } = Dimensions.get("window");

const TopNavbar = () => {
  return (
    <View
      className="w-full bg-white h-[8%] flex flex-row justify-start px-5"
      style={{ elevation: 10 }}
    >
      <Image
        source={require("../../../assets/adaptive-icon.png")}
        style={{
          width: width * 0.1, // add width
          height: height * 0.05, // 30% of screen height
          resizeMode: "contain",
        }}
        className="my-auto"
      />
      {/* <View className="my-auto">
        <Pressable className="bg-red-600 py-2 px-5" style={{ borderRadius : 10 }}>
          <Text className="font-extrabold" style={{ color: 'yellow' }}>Go to List</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default TopNavbar;
