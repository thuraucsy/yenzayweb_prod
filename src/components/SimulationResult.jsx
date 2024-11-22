import { Typography, Box } from "@mui/material";
import YenOrGoldButton from "./YenOrGoldButton";
import { useApp } from "../ThemedApp";
import { useQuery } from "react-query";
import { useEffect } from "react";

const api = import.meta.env.VITE_YENZAY_API;

export default function SimulationResult() {
    const { yItem, setYItem } = useApp();
    let apiUrl = `${api}/day/today.json`;
    const { isLoading, isError, error, data } = useQuery("yenzay", async () => {
        const res = await fetch(apiUrl);
        return res.json();
    }, {
        retry: 1,
    });

    useEffect(() => {
        if (data && data.Items) {
            setYItem(data.Items.slice().reverse()[0]);
        }
    }, [data]);

    return (
        <Box style={styles.banner}>
            <Box>
                <Typography style={styles.text.label}>Simulation Result</Typography>
                <Box style={styles.balance} sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Typography style={styles.text.label}>¥</Typography>
                    <Typography style={styles.text.amount}>{yItem ? yItem.MMKRatePerYen : ""}</Typography>
                    <Typography style={styles.text.label}>/&nbsp;&nbsp;K{yItem ? yItem.DayTime : ""}</Typography>
                </Box>
            </Box>
            <Box style={styles.yenOrGold}>
                <YenOrGoldButton />
            </Box>
        </Box>
    );
}

const styles = {
    banner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#6d25e5",
        position: "sticky",
        top: -1,
        zIndex: 10,
    },
    balance: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    yenOrGold: {
        alignItems: "flex-end",
    },
    text: {
        label: {
            fontWeight: "bold",
            color: "#aaa",
        },
        amount: {
            fontWeight: "bold",
            fontSize: 40,
            color: "#fff",
        },
        growth: {
            color: "#6f6",
        },
    },
};
