import { Box } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { getCurrencyFormatter, useApp } from "../ThemedApp";
import { useQuery } from "react-query";
import dayjs from "dayjs";

const api = import.meta.env.VITE_YENZAY_API;

export default function Chart() {
    const { calendarValue } = useApp();

    const { isLoading, isError, error, data } = useQuery(["yenzay_year_average", calendarValue], async ({ queryKey }) => {
        const [_, calendarValue] = queryKey;
        let apiUrl = `${api}/day/today.json`;
        
        if (calendarValue) {
            apiUrl = `${api}/month/${calendarValue.format('YYYYMM')}.json`;
        }
        const res = await fetch(apiUrl);
        return res.json();
    }, {
        retry: 1,
    });

    const xAxis = [];
    const yAxis = [];
    if (data) {
        for (var key2 in data['Items']) {
            const data2 = data['Items'][key2];
            xAxis.push(dayjs(data2['YearMonth'] + '/' + data2['DayTime']));
            yAxis.push(getCurrencyFormatter(data2['MMKRatePerYen'], 2));
        }
    }

    return (
        <Box
            sx={{
                height: 400,
            }}>
            <LineChart
                grid={{ vertical: true, horizontal: true }}
                xAxis={[{
                    // data: [1, 2, 3, 5, 8, 10],
                    data: xAxis,
                    valueFormatter: (v) => dayjs(v).format("MM/DD HH:mm"),
                }]}
                series={[
                    {
                        // data: [2, 5.5, 2, 8.5, 1.5, 5],
                        data: yAxis,
                    },
                ]}
                height={300}
            />
        </Box>
    );
}