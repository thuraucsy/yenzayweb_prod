import { Typography, Box } from "@mui/material";

export default function BalanceCard() {
    return (
        <Box style={styles.banner} sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <Box>
                <Typography style={styles.text.label}>Balance</Typography>
                <Box style={styles.balance} sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Typography style={styles.text.label}>$</Typography>
                    <Typography style={styles.text.amount}>12,543.74</Typography>
                </Box>
            </Box>
            <Box style={styles.balanceGrowth}>
                <Typography style={styles.text.growth}>+520 Today</Typography>
            </Box>
        </Box>
    );
}

const styles = {
    banner: {
        padding: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#6d25e5",
		position: "relative",
    },
    balance: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    balanceGrowth: {
        alignItems: "flex-end",
        paddingTop: 10,
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
