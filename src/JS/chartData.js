import { categoryArray } from "./categoryArray";

function getPercentage(total_budget, amountSpent) {
    // total_budget = 100;
    percentage_spent = (amountSpent / total_budget) * 100
    return percentage_spent;

}


export default function createChartData(todo, budget, remainingAmount) {
    // console.log(remainingAmount);

    let chartDataArray = []
    todo.forEach(element => {
        const matchedCategory = categoryArray.find(elm => element.category == elm.categoryLabel);
        // console.log(matchedCategory);

        const newObj = {
            name: element.category,
            amountSpent: `₹ ${element.amount} /-`,
            percentage: getPercentage(budget, Number(element.amount)),
            color: matchedCategory?.categoryColor,
            legendFontColor: 'black',
            legendFontSize: 15
        }

        chartDataArray.push(newObj)
    });

    const remainingAmountObj = {
        name: 'Remaining',
        amountSpent: `₹ ${remainingAmount} /-`,
        percentage: getPercentage(budget, Number(remainingAmount)),
        color: '#a7c957',
        legendFontColor: 'black',
        legendFontSize: 15
    }
    chartDataArray.push(remainingAmountObj)
    // console.log(chartDataArray);
    return chartDataArray
}

// [
//     { "amountSpent": "₹ 80 /-", "color": "#0096c7", "legendFontColor": "black", "legendFontSize": 15, "name": "Rent", "percentage": 40 },
//     { "amountSpent": "₹ 50 /-", "color": "#023e8a", "legendFontColor": "black", "legendFontSize": 15, "name": "Food", "percentage": 25 },
//     { "amountSpent": "₹ 20 /-", "color": "#0077b6", "legendFontColor": "black", "legendFontSize": 15, "name": "Transport", "percentage": 10 },
//     { "amountSpent": "₹ 50 /-", "color": "#a7c957", "legendFontColor": "black", "legendFontSize": 15, "name": "Remaining", "percentage": 25 }
// ]