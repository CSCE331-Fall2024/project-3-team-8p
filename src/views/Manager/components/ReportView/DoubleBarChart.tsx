import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import XOrZReportDict from "../../../../models/dict-types/XOrZReportDict";
import LoadingView from "../../../shared/LoadingView";

interface SingleBarChartProps {
    chartName: string;
    dataProvider: () => Promise<XOrZReportDict>;
}

type ChartData = {
    hour: number,
    orders: number,
    sales: number
};

/**
 * The SingleBarComponent displays a bar chart with hourly orders and sales data.
 * It fetches data from the `dataProvider` function, which provides a report, and renders the data as a vertical bar chart.
 *
 * @param chartName - The title of the chart to display.
 * @param dataProvider - A function that returns a promise which resolves to the report data.
 * @returns A component that displays a bar chart with two bars: number of orders and sales amount for each hour of the day.
 * @constructor
 */
function SingleBarComponent({ chartName, dataProvider }: SingleBarChartProps) {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(false);

    const getReportData = useCallback(async () => {
        setLoading(true);
        const reportData: XOrZReportDict = await dataProvider();
        setChartData(reportData.ordersByHour.map((currHourOrders, index) => ({
            hour: index + 1,
            orders: currHourOrders,
            sales: reportData.salesByHour[index],
        })));
        setLoading(false);
    }, [dataProvider]);

    // Populate the chart with default values when it first loads
    useEffect(() => {
        getReportData();
    }, [getReportData]);

    const calculatedHeight = chartData.length * 55 + 100;

    return (
        <div className={"chart-container chart-data h-100 d-flex flex-column justify-content-center"}>

            {loading && (
                <div className="d-flex flex-column justify-content-center flex-grow-1">
                    <LoadingView color="black" />
                </div>
            )}

            {!loading && (
                <div className="bg-white mb-3">
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
            )}
        </div>
    );
}

export default SingleBarComponent;