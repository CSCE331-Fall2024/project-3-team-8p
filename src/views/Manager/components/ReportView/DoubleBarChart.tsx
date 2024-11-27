import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import XZReportData from "../../../../models/typedefs/XZReportData";

interface SingleBarChartProps {
    chartName: string;
    dataProvider: () => Promise<XZReportData>;
}

type ChartData = {
    hour: number,
    orders: number,
    sales: number
};

function SingleBarComponent({ chartName, dataProvider }: SingleBarChartProps) {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const getReportData = useCallback(async () => {
        const reportData: XZReportData = await dataProvider();
        setChartData(reportData.ordersByHour.map((currHourOrders, index) => ({
            hour: index + 1,
            orders: currHourOrders,
            sales: reportData.salesByHour[index],
        })));
    }, [dataProvider]);

    // Populate the chart with default values when it first loads
    useEffect(() => {
        getReportData();
    }, [getReportData]);

    const calculatedHeight = chartData.length * 55 + 100;

    return (
        <div className={"chart-data"}>
            <div className="w-full bg-white mb-3">
                <h5 className="px-4 py-3">{chartName}</h5>
                <div
                    className="overflow-y-auto"
                    style={{
                        height: '560px',
                        maxHeight: '560px'
                    }}
                >
                    <div style={{ height: `${calculatedHeight}px`, minHeight: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    top: 0,
                                    right: 60,
                                    left: 30,
                                    bottom: 20
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    type="number"
                                    orientation="top"
                                    label={{
                                        value: "Count / Amount",
                                        position: "insideTopRight",
                                        offset: 0,
                                        dy: -30
                                    }}
                                    tick={{ dy: 0 }}  // Adjust tick position
                                />
                                <YAxis
                                    dataKey="hour"
                                    type="category"
                                    width={90}
                                    tick={{ fontSize: 12 }}
                                    label={{
                                        value: "Hour of Day",
                                        angle: -90,
                                        position: "left",
                                        offset: -20
                                    }}
                                />
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    align="left"
                                    height={36}
                                    wrapperStyle={{
                                        paddingRight: '20px'
                                    }}
                                />
                                <Bar
                                    dataKey="orders"
                                    fill="#FF8F8F"
                                    name="Number of Orders"
                                />
                                <Bar
                                    dataKey="sales"
                                    fill="#4A90E2"
                                    name="Sales Amount"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBarComponent;