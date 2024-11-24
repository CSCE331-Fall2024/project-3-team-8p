import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Form } from "react-bootstrap";
import ProductUsageData from "../../../models/typedefs/ProductUsageData";
import SalesReportData from "../../../models/typedefs/SalesReportData";

interface SingleBarChartProps {
    chartName: string;
    dataProvider: (
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number
    ) => Promise<ProductUsageData | SalesReportData>;
}

type ChartData = {
    itemName: string,
    amount: number
};

type FormData = {
    startDate: string,
    endDate: string
};

// Helper function that returns a specified offset from the current day in the format: YYYY-MM-DD
const getFormattedDate = (daysOffset: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};

const getChartUnits = (chartName: string) => {
    if (chartName === "Product Usage Report") {
        return "Amount Used";
    } else {
        // Sales Report
        return "Items Sold";
    }
};

function SingleBarComponent({ chartName, dataProvider }: SingleBarChartProps) {
    // By default, get the previous week's data
    const [formData, setFormData] = useState<FormData>({
        startDate: getFormattedDate(-7),
        endDate: getFormattedDate(),
    });
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const getReportData = useCallback(async (
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number
    ) => {
        const reportData: SalesReportData | ProductUsageData = await dataProvider(startMonth, endMonth, startDay, endDay);
        setChartData(Object.entries(reportData).map(
            ([itemName, usage]: [string, number]) => ({
                itemName: itemName,
                amount: usage
            })));
    }, [dataProvider]);

    const parseDateInfo = useCallback(() => {
        // Parse start/end days and months from the form data
        // Dates are in the format: YYYY-MM-DD
        const startDate: string[] = formData.startDate.split("-");
        const endDate: string[] = formData.endDate.split("-");
        const startMonth: number = parseInt(startDate[1]);
        const endMonth: number = parseInt(endDate[1]);
        const startDay: number = parseInt(startDate[2]);
        const endDay: number = parseInt(endDate[2]);

        return { startMonth, endMonth, startDay, endDay };
    }, [formData]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // Populate the chart with default values when it first loads
    useEffect(() => {
        const { startMonth, endMonth, startDay, endDay } = parseDateInfo();
        getReportData(startMonth, endMonth, startDay, endDay);
    }, [parseDateInfo, getReportData, formData]);

    const calculatedHeight = chartData.length * 55 + 100;

    return (
        <div className={"chart-data"}>
            <div className="w-full bg-white mb-3">
                <h5 className="px-4 py-3">{chartName}</h5>
                <div
                    className="overflow-y-auto"
                    style={{
                        height: '500px',
                        maxHeight: '500px'
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
                                />
                                <YAxis
                                    dataKey="itemName"
                                    type="category"
                                    width={90}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    align="left"
                                    height={36}
                                />
                                <Bar dataKey="amount" name={getChartUnits(chartName)} fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <Form className="text-white d-flex justify-content-between gap-4">
                <Form.Group className={"mb-3 flex-grow-1"} controlId={"startDate"}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        name={"startDate"}
                        type={"date"}
                        value={formData.startDate}
                        onChange={handleDateChange}
                    />
                </Form.Group>

                <Form.Group className={"mb-3 flex-grow-1"} controlId={"endDate"}>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        name={"endDate"}
                        type={"date"}
                        value={formData.endDate}
                        onChange={handleDateChange}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default SingleBarComponent;