import { Pressable, Text, View } from "react-native";

const ItemTabs = ({
  slNo = "",
  expenseTitle = "",
  expenseAmount = 0,
  expenseDateTime = [],
  expenseDeleteFunction,
}) => {
  // console.log(expenseDateTime);

  return (
    <>
      <View
        className="bg-[#dee2e6] rounded-3xl flex flex-row border-4 overflow-hidden my-2"
        style={{ elevation: 5 }}
      >
        {/* start View */}

        {/* serial number */}
        <View className="w-2/12 px-2 bg-[#343a40] justify-center items-center">
          <Text className="text-white font-extrabold">{slNo}</Text>
        </View>
        {/* serial number */}

        {/* right panel */}
        <View className="w-10/12 p-2">
          <View className="w-[100%] flex flex-row py-4 px-2 ">
            <View className="w-5/12">
              <Text className="text-center my-auto font-bold">
                {expenseTitle}{" "}
              </Text>
            </View>
            <View className="w-3/12">
              <Text className="text-center my-auto font-bold text-red-600">
                {expenseAmount}
              </Text>
            </View>
            <View className="w-4/12">
              <Text className="text-center text-sm font-extrabold">
                {expenseDateTime[0]}
              </Text>
              <Text className="text-center text-sm font-extrabold">
                {expenseDateTime[1]}
              </Text>
            </View>
          </View>

          <View className="w-[100%] flex justify-center flex-row py-3">
            <Pressable
              className="bg-red-600 py-3 w-[40%] rounded-2xl"
              onPress={expenseDeleteFunction}
            >
              <Text className="text-center color-yellow-300 font-extrabold">
                {" "}
                Delete
              </Text>
            </Pressable>
          </View>
        </View>

        {/* end View */}
      </View>
    </>
  );
};

export default ItemTabs;
