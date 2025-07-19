import React from "react";
import Modal from "react-native-modal";
import { View, Image, Pressable } from "react-native";

const ModelComponent = ({ children }) => {
  return (
    <Modal isVisible={true}>
      <View className="p-10 w-[90%] bg-white rounded-3xl m-auto relative">
        <View className="h-20 border-b-slate-500 border-b-2">
          <Image
            source={require("../../assets/adaptive-icon.png")}
            style={{
              width: 50,
              height: 70,
              resizeMode: "contain",
            }}
            className="my-auto "
          />
        </View>
        <View className="py-8">{children}</View>
      </View>
    </Modal>
  );
};

export default ModelComponent;
