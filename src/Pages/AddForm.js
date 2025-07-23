import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, Image, Dimensions } from "react-native";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
// import { appStyle } from "../CSS/appStyle";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Modal from "react-native-modal";
import { categoryArray } from "../JS/categoryArray";
import { getRemainingAmount } from "../JS/getDatas";

const AddForm = () => {
  const [userExpenseName, setUserExpenseName] = useState("");
  const [userExpenseAmount, setUserExpenseAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(0);

  const [storeUserName, setStoreUserName] = useState("");
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // ===================================================================================================================
  // ===================================================================================================================

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        text1Style={{ fontSize: 15 }}
        text2Style={{
          fontSize: 12,
          flexWrap: 'wrap',
          color: '#333',
          marginTop: 5,
        }}
        style={{
          minHeight: 100, // ✅ Increase height here
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderLeftColor: 'red',
          borderLeftWidth: 5,
        }}
      />
    ),
  };

  // ===================================================================================================================
  // ===================================================================================================================
  async function saveBudget() {

    if (budget == 0 || budget.trim() == "") {
      Toast.show({
        type: "error",
        text1: "Invalid Budget ",
        text2: `Budget should be greater than 0`,
      });
      return;
    }
    else {

      // const storedBudget = await AsyncStorage.getItem("budget");
      const savedTodos = await AsyncStorage.getItem("todoList");

      let remaining;

      if (savedTodos != null && budget != null) {
        const parsedTodos = JSON.parse(savedTodos);
        const total = parsedTodos.reduce((result, currVal) => result + Number(currVal.amount), 0);
        remaining = Number(budget) - total;
      }

      if (Number(remaining) < 0) {
        Toast.show({
          type: "error",
          text1: "Invalid Budget ",
          text2: `Remaining cant be negative`,
        });
        return;
      }
      else {
        await AsyncStorage.setItem("budget", budget);
        Toast.show({
          type: "success",
          text1: "Budget Saved",
          text2: `Your Monthly budget is set to ${budget}`,
        });

        const remainingAmount = await getRemainingAmount();
        setRemainingAmount(remainingAmount);
        setShowBudgetModal(false)
      }
    }

  }

  // ===================================================================================================================
  // save data to storage
  const addTodo = async () => {

    if (Number(remainingAmount) < Number(userExpenseAmount)) {
      Toast.show({
        type: "error",
        text1: "Invalid Budget ",
        text2: `You do not have enough Budget to spend.. Increase your Monthly Budget first.`,
      });
      setShowBudgetModal(true)
      return
    }
    else if (userExpenseName == '' || userExpenseAmount == '' || category == '') {
      Toast.show({
        type: "error",
        text1: "Invalid Data ",
        text2: `Fill All Fields`,
      });
      return
    }
    else if (Number(userExpenseAmount) == 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Data ",
        text2: `Amount  cannot be 0`,
      });
      return
    }

    else {
      const now = new Date();
      const currentDate = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();

      const newTodo = {
        title: userExpenseName.trim(),
        amount: userExpenseAmount.trim(),
        category: category,
        currentDate: currentDate,
        currentTime: currentTime,
      };

      const savedTodos = await AsyncStorage.getItem("todoList");
      let updatedList;

      if (savedTodos != null) {
        const parsedTodos = JSON.parse(savedTodos);
        updatedList = [newTodo, ...parsedTodos];
      }
      else {
        updatedList = [newTodo];
      }
      await AsyncStorage.setItem("todoList", JSON.stringify(updatedList))

      Toast.show({
        type: "success",
        text1: "Data Saved",
        text2: "Check List Page",
      });

      const remainingAmount = await getRemainingAmount();
      setRemainingAmount(remainingAmount);

      // Reset fields after saving
      setUserExpenseName("");
      setUserExpenseAmount(0);
      setCategory("");
    }

  }
  // ===================================================================================================================
  // ===================================================================================================================

  // loading initial data from storage and sabing in todo list
  useEffect(() => {
    function onFirstDateShowModal() {
      const today = new Date();
      const date = today.getDate();

      if (date == 1) {
        setShowBudgetModal(true);
      }
    }
    onFirstDateShowModal();

    // =======================================================================================================================

    async function loadData() {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        setStoreUserName(storedName);

        const storedBudget = await AsyncStorage.getItem("budget");
        if (storedBudget != null) {
          setBudget(storedBudget);
        }
        else if (storedBudget == null) {
          setBudget("0");
        }

        if (storedBudget == null || storedBudget == 0) {
          setShowBudgetModal(true);
        }

        const remainingAmount = await getRemainingAmount();
        setRemainingAmount(remainingAmount);



      }

      catch (e) {
        console.error("Failed to load todos:", e);
      }
    }

    loadData();
  }, []);


  // ===================================================================================================================
  // ===================================================================================================================
  return (
    <>
      <ProjectLayout>
        <View className="pt-10 h-[15%]  mx-auto w-[85%] flex flex-row justify-between pb-10">
          <View className="my-auto">
            <Text className="text-xl">𝑯𝒊 ,</Text>
            <Text className="font-extrabold text-3xl italic pt-2">{storeUserName}</Text>
          </View>
          <View className="my-auto">
            <Text className="text-sm font-extrabold color-red-600">Total Monthly Budget : {budget}</Text>
            <Text className="text-sm font-extrabold color-red-600">Remaining Monthly Budget : {remainingAmount}</Text>
            <Pressable className="py-2 mt-4 border-2 border-slate-500 rounded-3xl" onPress={() => { setShowBudgetModal(true) }}>
              <Text className="text-center">Edit Budget</Text>
            </Pressable>
          </View>
        </View>

        <View className="pt-5 flex justify-center items-center h-[30%] ">
          <Image source={require("../../assets/img1.png")}
            style={{
              width: width * 0.5, // 80% of screen width
              resizeMode: "contain",
            }} />
        </View>

        <View className="w-full h-[50%] flex justify-center items-center ">
          <View className="mx-auto bg-[#6c757d] w-[85%] px-5 py-10 rounded-3xl">
            <View>
              <Text className="text-md font-bold mb-2">Enter Item Name : </Text>
              <TextInput className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold" placeholder="Enter Expense Name" value={userExpenseName} onChangeText={setUserExpenseName} />
            </View>

            <View className="flex flex-row mt-10 justify-between">
              <View className="w-[48%]">
                <Text className="text-md font-bold mb-2">Enter Amount Spent:</Text>
                <TextInput className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold" placeholder="Enter Expense Amount" value={userExpenseAmount} keyboardType="numeric" onChangeText={setUserExpenseAmount} />
              </View>

              <View className="w-[48%]">
                <Text className="text-md font-bold mb-2">Enter Category:</Text>
                <Pressable onPress={() => { setShowCategoryModal(true) }}>
                  <TextInput
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold"
                    placeholder="Enter Category"
                    value={category}
                    editable={false} // Disable typing
                    pointerEvents="none" // Disable keyboard
                  />
                </Pressable>
              </View>
            </View>

            <Pressable className="bg-[#a7c957] mt-10 py-4 rounded-2xl" style={{ elevation: 5 }}>
              <Text className="text-center font-bold text-lg" onPress={addTodo}>Add Expense</Text>
            </Pressable>
          </View>
        </View>
      </ProjectLayout>

      <Toast
        config={toastConfig}
        position="top" // or "top"
        topOffset={100} // keeps it above gesture bar
        visibilityTime={2000} //  1.5s then auto‑hide
      />

      <Modal isVisible={showBudgetModal}>
        <View className="p-5  w-[90%] bg-slate-50 mx-auto rounded-3xl">
          <Text className=" border-b-2 border-slate-500 mb-6 pt-3 pb-5 font-bold text-xl">Set Your Monthly Budget</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold mb-3"
            placeholder="Enter Monthly Budget"
            value={budget}
            keyboardType="numeric"
            onChangeText={setBudget}
          />
          <Pressable className="bg-red-600 py-3 rounded-3xl " onPress={saveBudget}>
            <Text className="text-center color-amber-300 font-bold text-lg">Set Budget</Text>
          </Pressable>
        </View>
      </Modal>


      <Modal isVisible={showCategoryModal}>
        <View className="p-5  w-[90%] bg-slate-50 mx-auto rounded-3xl">
          <Text className="mb-6 pt-3 pb-5 font-bold text-xl">Select Category</Text>
          <View>
            {categoryArray.map(
              ({ categoryLabel, categoryDescription }, index) => (

                <Pressable
                  className="py-3 border-b-2 border-blue-500 flex flex-row justify-center"
                  key={index}
                  onPress={() => {
                    setCategory(categoryLabel);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text className="text-center font-bold">{categoryLabel} -</Text>
                  <Text className="color-slate-500 px-2">{categoryDescription}</Text>
                </Pressable>

              )
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddForm;

// getting the existing todos on load
// adding todos by cloning the existing todos and adding a new todo to it
// saving the todos on change in state of todo list change
