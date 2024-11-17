import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductUsageChartProps {
    productUsageData: Record<string, number>
}

type ChartData = {
    itemName: string,
    usage: number
};

function ProductUsageChart({ productUsageData }: ProductUsageChartProps) {
    // The `BarChart` component requires the data to be formatted as a list of dictionaries
    const barChartData: ChartData[] = Object.entries(productUsageData).map(
        ([itemName, usage]: [string, number]) => ({
            itemName: itemName,
            usage: usage
        }))

    return (
        <ResponsiveContainer width={"100%"}>
            <BarChart
                data={barChartData}
                margin={{
                    top: 5,
                    right: 30,
                    bottom: 5,
                    left: 20
                }}
            >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="itemName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ProductUsageChart;