import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { db } from "./Firebase/Firebase.config";
import { getDocs } from "firebase/firestore";
import { collection, setDoc, doc } from "firebase/firestore"; 

const ExpensesPieChart = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const addExpenseRecord = async () => {
      try {
        await setDoc(doc(db, 'expenses', 'fuel'), {
          category: 'Fuel Charges',
          amount: 5000
        });
        await setDoc(doc(db, 'expenses', 'services'), {
          category: 'Other Services',
          amount: 2000
        });
        
        console.log('Expense records added successfully');
        
        // Retrieve expense records
        const querySnapshot = await getDocs(collection(db, 'expenses'));
        const expenses = [];
        querySnapshot.forEach((doc) => {
          expenses.push(doc.data());
        });
        setExpensesData(expenses);
      } catch (error) {
        console.error('Error adding or retrieving expense records: ', error);
        setError(error.message);
      }
    };

    addExpenseRecord();
  }, []);

  const preparePieChartData = () => {
    const colors = ['yellow', 'blue']; // Add more colors as needed
    const totalAmount = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
    
    return expensesData.map((expense, index) => ({
      name: expense.category,
      amount: expense.amount,
      percentage: (expense.amount / totalAmount) * 100,
      color: colors[index % colors.length], // Cycle through colors array
    }));
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses Pie Chart</Text>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <PieChart
          data={preparePieChartData()}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'white',
            color: (opacity = 1) => `red`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAD2', // lightgoldenrodyellow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B4513', // chocolate
    fontFamily: 'serif'
  },
  errorText: {
    fontSize: 18,
    color: 'red', // darkred
    fontFamily: 'serif'
  },
});

export default ExpensesPieChart;
