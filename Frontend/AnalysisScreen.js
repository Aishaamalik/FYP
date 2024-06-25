import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { db } from "./Firebase/Firebase.config";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

class LinearRegression {
  constructor(xValues, yValues) {
    if (xValues.length !== yValues.length) {
      throw new Error('Input arrays must have the same length');
    }

    this.xValues = xValues;
    this.yValues = yValues;
    const n = xValues.length;

    const sumX = xValues.reduce((acc, x) => acc + x, 0);
    const sumY = yValues.reduce((acc, y) => acc + y, 0);

    const sumXX = xValues.reduce((acc, x) => acc + x * x, 0);
    const sumXY = xValues.reduce((acc, x, i) => acc + x * yValues[i], 0);

    this.slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    this.intercept = (sumY - this.slope * sumX) / n;
  }

  predict(x) {
    return this.slope * x + this.intercept;
  }
}

const AnalysisScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sales'));
        const data = querySnapshot.docs.map(doc => doc.data());
        const processedData = processData(data);
        const predictedRevenue = predictRevenue(data); // Predict revenue using Linear Regression
        setChartData({ processedData, predictedRevenue });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const revenueByMonth = {};

    // Calculate total revenue for each month
    data.forEach(sale => {
      const date = sale.date.substring(0, 7); // Extract year-month format
      const revenue = sale.quantity * sale.unitPrice; // Calculate revenue for the sale
      if (revenueByMonth[date]) {
        revenueByMonth[date] += revenue; // Add revenue to existing month total
      } else {
        revenueByMonth[date] = revenue; // Initialize month total if it doesn't exist
      }
    });

    // Sort keys (months) in chronological order
    const sortedMonths = Object.keys(revenueByMonth).sort();

    // Convert sorted keys to labels and retrieve corresponding revenue
    const labels = sortedMonths;
    const datasets = [{
      data: sortedMonths.map(month => revenueByMonth[month]),
    }];

    return { labels, datasets };
  };

  const predictRevenue = (data) => {
    // Convert data to arrays for linear regression
    const xValues = data.map(sale => new Date(sale.date).getTime());
    const yValues = data.map(sale => sale.quantity * sale.unitPrice);

    // Create and train the linear regression model
    const regression = new LinearRegression(xValues, yValues);

    // Generate predictions for next 6 months
    const predictedValues = [];
    for (let i = 0; i < 6; i++) {
      const nextMonthTimestamp = new Date(data[data.length - 1].date);
      nextMonthTimestamp.setMonth(nextMonthTimestamp.getMonth() + i + 1);
      predictedValues.push(regression.predict(nextMonthTimestamp.getTime()));
    }

    return predictedValues;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
  <View style={styles.container}>
   
    <LineChart
      data={chartData.processedData}
      width={340}
      height={300}
      yAxisLabel="PKR"
      yAxisSuffix=""
      style={styles.chart}
      bezier
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => 'black',
        labelColor: (opacity = 1) => 'red',
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      
    />
     <View style={{ marginVertical: 10 }} />
    <LineChart
      data={{ datasets: [{ data: chartData.predictedRevenue }] }}
      width={340}
      height={300}
      yAxisLabel="PKR"
      yAxisSuffix=""
      style={styles.chart}
      bezier
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => 'black',
        labelColor: (opacity = 1) => 'red',
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
        
      }}
    />
  </View>
</ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgoldenrodyellow',
  },
  chart: {
    marginVertical: 15,
    borderRadius: 24,
  },
});

export default AnalysisScreen;
