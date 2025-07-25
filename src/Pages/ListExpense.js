import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import ItemTabs from "../Components/ItemTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categoryArray } from "../JS/categoryArray";
import Modal from "react-native-modal";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import createChartData from "../JS/chartData";

const ListExpense = () => {
  const [todoList, setTodoList] = useState([]);
  const [sum, setSum] = useState(0);
  const [budget, setBudget] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [category, setCategory] = useState('');
  const [showChart, setShowChart] = useState(false)
  const [chartDataArray, setChartDataArray] = useState([])


  useEffect(() => {
    async function loadData() {
      const storedTodos = await AsyncStorage.getItem("todoList"); //get the items
      const storedBudget = await AsyncStorage.getItem("budget");

      if (storedTodos != null) {
        const parsedTodo = JSON.parse(storedTodos);
        const total = parsedTodo.reduce((result, currVal) => result + Number(currVal.amount), 0);
        setTodoList(parsedTodo);
        setSum(total);
        const remaining = Number(storedBudget) - total;
        setChartDataArray(createChartData(parsedTodo, Number(storedBudget), Number(remaining)))
        setRemainingAmount(remaining);
      }

      if (storedBudget != null) {
        setBudget(storedBudget);
      } else if (storedBudget == null) {
        setBudget("0");
      }
    }
    loadData();

  }, []);


  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label and line color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional
    decimalPlaces: 2, // optional, for value formatting
  };





  async function deleteItem(index) {
    const updatedTodo = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodo);
    const newSum = updatedTodo.reduce((result, currVal) => result + Number(currVal.amount), 0);
    const remaining = Number(budget) - newSum;
    setRemainingAmount(remaining);
    setSum(newSum);

    await AsyncStorage.setItem("todoList", JSON.stringify(updatedTodo));
  }


  const filterByCategory = async (categoryName) => {
    setCategory(categoryName);

    const storedTodos = await AsyncStorage.getItem("todoList"); //get the items
    if (storedTodos != null) {
      const parsedTodo = JSON.parse(storedTodos);

      if (categoryName === 'All') {
        const newSum = parsedTodo.reduce((result, currVal) => result + Number(currVal.amount), 0);
        setSum(newSum)
        setTodoList(parsedTodo)
        setShowCategoryModal(false);
      }

      else {
        const filteredTodo = parsedTodo.filter((elm) => elm.category == categoryName)
        const newSum = filteredTodo.reduce((result, currVal) => result + Number(currVal.amount), 0);
        setSum(newSum)
        setTodoList(filteredTodo)
        setShowCategoryModal(false)
      }

    }
  }

  return (
    <>
      <ProjectLayout>
        <View className="pt-10 px-10 h-[15%] flex flex-row justify-between">
          <View>
            <Text className="text-sm font-extrabold color-red-600">
              Total Monthly Budget : {budget}
            </Text>
            <Text className="text-sm font-extrabold color-red-600">
              Remaining Monthly Budget : {remainingAmount}
            </Text>
            <Text className="font-extrabold text-3xl italic pt-6 my-auto">
              𝒀𝒐𝒖𝒓 𝑬𝒙𝒑𝒆𝒏𝒔𝒆𝒔 :
            </Text>
          </View>

          <View className="py-8 bg-[#ffba08] w-[20%] flex justify-center flex-row rounded-2xl border-red-700 border-4 h-24">
            <Text className="font-extrabold">{sum}</Text>
          </View>
        </View>

        <View className="h-[10%] px-10 py-8 flex  flex-row">
          <View className="w-[70%] px-4">
            <Text className="text-sm font-bold mb-2">Filter by Category:</Text>
            <Pressable onPress={() => { setShowCategoryModal(true) }}>
              <TextInput
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold color-black"
                placeholder="Select Category"
                value={category}
                editable={false} // Disable typing
                pointerEvents="none" // Disable keyboard
              />
            </Pressable>
          </View>

          <View className="w-[30%] px-3">
            <Pressable className="rounded-3xl my-auto h-10" onPress={() => setShowChart(true)}>
              <FontAwesome name="bar-chart" size={25} color="red" className="m-auto" />
              <Text className="text-sm font-extrabold mx-auto">View Charts</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView className="px-10 h-[65%] mt-10">
          {todoList.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">
              No expenses found 😔😔.
            </Text>
          ) : (
            todoList.map((elm, index) => (
              <ItemTabs
                key={index}
                slNo={index + 1}
                expenseTitle={elm.title}
                expenseAmount={elm.amount}
                expenseCategory={elm.category}
                expenseDateTime={[elm.currentDate, elm.currentTime]}
                expenseDeleteFunction={() => deleteItem(index)}
              />
            ))
          )}
        </ScrollView>
      </ProjectLayout>


      <Modal isVisible={showCategoryModal}>
        <View className="p-5 w-[90%] bg-slate-50 mx-auto rounded-3xl">
          <Text className="mb-6 pt-3 pb-5 font-bold text-xl">Select Category</Text>
          <View>
            <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={78} onPress={() => filterByCategory('All')}>
              <Text className="text-center font-bold">All </Text>
            </Pressable>
            {categoryArray.map(
              ({ categoryLabel, categoryDescription }, index) => (
                <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={index} onPress={() => filterByCategory(categoryLabel)}>
                  <Text className="text-center font-bold">{categoryLabel} -</Text>
                  <Text className="color-slate-500 px-2">{categoryDescription}</Text>
                </Pressable>
              )
            )}
          </View>
          <Pressable className="bg-red-600 py-3 rounded-3xl " onPress={() => setShowCategoryModal(false)}>
            <Text className="text-center color-amber-300 font-bold text-lg">Close</Text>
          </Pressable>
        </View>
      </Modal>


      <Modal isVisible={showChart}>
        <View className="p-5 w-[90%] bg-slate-50 mx-auto rounded-3xl">
          <Text className="mb-6 pt-3 pb-5 font-bold text-xl">Split of Expenes (in % out of 100)</Text>
          <View className="flex-row justify-center items-center">
            <PieChart
              data={chartDataArray}
              width={200}
              height={200}
              chartConfig={chartConfig}
              accessor={"percentage"}
              backgroundColor={"transparent"}
              paddingLeft={"50"}
              center={[0, 0]}
              absolute
              hasLegend={false}
              style={{ marginBottom: 16 }}
            />

            <View className="ml-5">
              {chartDataArray.map((item, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <View
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <Text className="text-sm font-bold">{item.percentage} {item.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <Pressable className="bg-red-600 py-3 rounded-3xl " onPress={() => setShowChart(false)}>
            <Text className="text-center color-amber-300 font-bold text-lg">Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ListExpense;
