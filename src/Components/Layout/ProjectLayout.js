import { View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavbar from "../Fixed/BottomNavbar";
import TopNavbar from "../Fixed/TopNavbar";

const ProjectLayout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1">
      <TopNavbar />
      <View className="h-[82%]">{children}</View>
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default ProjectLayout;
