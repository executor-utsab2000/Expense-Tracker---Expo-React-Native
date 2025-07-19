import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import ProjectLayout from "../Components/Layout/ProjectLayout";
import ItemTabs from "../Components/ItemTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListExpense = () => {
  const [todoList, setTodoList] = useState([]);
  const [sum, setSum] = useState(0);
  const [budget, setBudget] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const storedTodos = await AsyncStorage.getItem("todoList"); //get the items
      const storedBudget = await AsyncStorage.getItem("budget");

      if (storedTodos != null) {
        const parsedTodo = JSON.parse(storedTodos);
        const total = parsedTodo.reduce(
          (result, currVal) => result + Number(currVal.amount),
          0
        );
        setTodoList(parsedTodo);
        setSum(total);
        const remaining = Number(storedBudget) - total;
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

  async function deleteItem(index) {
    const updatedTodo = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodo);
    const newSum = updatedTodo.reduce((result, currVal) => result + Number(currVal.amount),0);
    const remaining = Number(budget) - newSum;
    setRemainingAmount(remaining);
    setSum(newSum);

    await AsyncStorage.setItem("todoList", JSON.stringify(updatedTodo));



  }

  return (
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

      <ScrollView className="px-10 h-[80%] mt-10">
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
              expenseDateTime={[elm.currentDate, elm.currentTime]}
              expenseDeleteFunction={() => deleteItem(index)}
            />
          ))
        )}
      </ScrollView>
    </ProjectLayout>
  );
};

export default ListExpense;
