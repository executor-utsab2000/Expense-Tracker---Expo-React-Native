import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRemainingAmount = async () => {
    const savedTodos = await AsyncStorage.getItem("todoList");
    const budget = await AsyncStorage.getItem("budget");

    let remaining;

    if (savedTodos != null && budget != null) {
        const parsedTodos = JSON.parse(savedTodos);
        const total = parsedTodos.reduce((result, currVal) => result + Number(currVal.amount), 0);
        remaining = Number(budget) - total;
    }
    else {
        remaining = Number(budget);
    }

    // console.log(remaining);
    return remaining;
}