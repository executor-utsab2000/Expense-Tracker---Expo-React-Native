import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import { FontAwesome5 } from "@expo/vector-icons";
import Model_AllDataPage from "./Model_AllDataPage";
import Toast from "react-native-toast-message";

const AllRecords = () => {
  const [allData, setAllData] = useState(null);
  const [showModel, setShowModel] = useState(true);
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    async function getAllData() {
      let storedAllTodoList = await AsyncStorage.getItem("allTodoList");
      console.log(storedAllTodoList);
      
      try {
        storedAllTodoList = JSON.parse(storedAllTodoList);
        if (Array.isArray(storedAllTodoList)) {
          setAllData(storedAllTodoList);
        } else {
          setAllData([]); // fallback in case data is not an array
        }
      } catch (e) {
        console.log("Error parsing JSON:", e);
        setAllData([]); // fallback if JSON is invalid
      }
    }

    getAllData();
  }, []);

  function getModelData(modelId) {
    // console.log(modelId);

    const modelData = allData.find((elm) => elm.id == modelId);
    // console.log(modelData);

    const total = modelData.todos.reduce(
      (sum, elm) => sum + Number(elm.amount),
      0
    );
    setModelData({ ...modelData, total });
    setShowModel(true);
  }

  async function getModelId(id , title) {
    const newRecordData = allData.filter((elm) => elm.id != id);
    setAllData(newRecordData);
    setShowModel(false);
    Toast.show({
      type: "success",
      text1: "Record Deleted",
      text2: `Record Deleated for ${title}`,
    });
    await AsyncStorage.setItem("allTodoList", JSON.stringify(newRecordData));
    // console.log(id);
  }

  return (
    <>
      <ProjectLayout>
        <ScrollView className="flex-1 px-5">
          {allData && allData.length > 0 ? (
            allData.map((elm, index) => (
              <Pressable
                key={index}
                className="w-[90%] px-4 py-3 border-b-2 border-blue-500 mx-auto my-2 flex flex-row justify-between"
                onPress={() => {
                  getModelData(elm.id);
                }}
              >
                <Text className="text-base font-semibold">{elm.title}</Text>
                <FontAwesome5 name="eye" size={20} color="#black" />
              </Pressable>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-10">
              Month Wise records will be added on 1st of every Month.
            </Text>
          )}
        </ScrollView>
      </ProjectLayout>

      <Model_AllDataPage
        modelDataById={modelData}
        setShowModel={() => setShowModel(false)}
        showModel={showModel}
        getModelIdFunction={() => getModelId(modelData.id , modelData.title)}
      />

      <Toast
        position="top" // or "top"
        topOffset={100} // keeps it above gesture bar
        visibilityTime={2000} // 2 s then auto‑hide
      />
    </>
  );
};

export default AllRecords;
