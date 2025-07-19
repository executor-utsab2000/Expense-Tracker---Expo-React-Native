import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import ProfileTabs from "../Components/ProfileTabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getUserData from "../JS/getUserProfileData";
// import { mostSpentCalc } from "../JS/mostSpentCalc";
// import { highestSpentCalc } from "../JS/highestSpentCalc";

const { width, height } = Dimensions.get("window");

const UserProfile = () => {
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState({
    userName: "",
    userGender: "",
    userProfilePic: "",
    genderLogo: "",

    totalRecords: 0,
    totalRecordsThisMonth: 0,

    thisMonthTillDateSpent: 0,
    totalSpentLastMonth: 0,

    mostSpentThisMonth: 0,
    mostSpentLastMonth: 0,

    highestSpentThisMonth: 0,
    highestSpentLastMonth: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUserDetails(userData);
      // console.log(userData);
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <>
      <ProjectLayout>
        <View className="flex items-center my-4">
          <View
            className="rounded-full overflow-hidden bg-white p-2 border-green-300 border-4 mb-3"
            style={{ elevation: 5 }}
          >
            <Image
              source={userDetails.userProfilePic}
              style={{
                width: width * 0.17, // add width
                height: height * 0.072, // 30% of screen height
                resizeMode: "contain",
              }}
            />
          </View>
          <Text className="text-center font-extrabold text-3xl mb-3 ">
            {userDetails.userName}
          </Text>
          <Image
            source={userDetails.genderLogo}
            style={{
              width: width * 0.1, // add width
              height: height * 0.03, // 30% of screen height
              resizeMode: "contain",
            }}
          />

          <Pressable
            className="flex flex-row px-8 py-3 bg-red-600 rounded-2xl mt-5"
            style={{ elevation: 5 }}
            onPress={() => navigation.navigate("nameInsert")}
          >
            <FontAwesome5
              name="pen"
              size={15}
              color="#ffd60a"
              solid
              className="my-auto"
              style={{ marginRight: 20 }}
            />
            <Text className="text-lg font-bold" style={{ color: "#ffd60a" }}>
              Edit
            </Text>
          </Pressable>
        </View>

        <ScrollView className="w-[90%] mx-auto mt-5">
          <View className="flex flex-row justify-around flex-wrap">
            <ProfileTabs
              title="Total records"
              value={userDetails.totalRecords}
              ifShowDetails={true}
              navigateTo="allRecords"
            />
            <ProfileTabs
              title="Total records this month"
              value={userDetails.totalRecordsThisMonth}
              ifShowDetails={true}
              navigateTo="list"
            />

            <ProfileTabs
              title="This month till date spent"
              value={`₹ ${userDetails.thisMonthTillDateSpent}`}
            />
            <ProfileTabs
              title="Total spent last month"
              value={`₹ ${userDetails.totalSpentLastMonth}`}
            />

            <ProfileTabs
              title="Most spent this month"
              value={userDetails.mostSpentThisMonth}
            />
            <ProfileTabs
              title="Most spent last month"
              value={userDetails.mostSpentLastMonth}
            />

            <ProfileTabs
              title="Highest spent this month "
              value={`₹ ${userDetails.highestSpentThisMonth}`}
            />
            <ProfileTabs
              title="Highest spent last month"
              value={`₹ ${userDetails.highestSpentLastMonth}`}
            />
          </View>
        </ScrollView>
      </ProjectLayout>
    </>
  );
};

export default UserProfile;
