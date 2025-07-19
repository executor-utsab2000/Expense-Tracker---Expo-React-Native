import React from "react";
import { Text, Dimensions, Image, View } from "react-native";

const { height, width } = Dimensions.get("window");

const LoadingScreen = () => {
  return (
    <View className="flex-1 w-[100%] flex items-center justify-center">
      <Image
        source={require("../../assets/img1.png")}
        style={{
          width: width * 0.5, // 80% of screen width
          resizeMode: "contain",
        }}
      />
    <Text>𝑳𝒐𝒂𝒅𝒊𝒏𝒈...</Text>
    </View>
  );
};

export default LoadingScreen;
