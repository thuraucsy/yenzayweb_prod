import { Box, Alert, Typography, IconButton } from "@mui/material";

import Item from "../components/YItem";

import { queryClient, useApp } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";
import BalanceCard from "../components/BalanceCard";
import ActionButton from "../components/ActionButton";

export default function Home() {
	const api = import.meta.env.VITE_YENZAY_API;

	const { isLoading, isError, error, data } = useQuery("yenzay", async () => {
		const res = await fetch(`${api}/day/today.json`);
		return res.json();
	});

	if (isError) {
		return (
			<Box>
				<Alert severity="warning">{error.message}</Alert>
			</Box>
		);
	}

	if (isLoading) {
		return <Box sx={{ textAlign: "center" }}>Loading...</Box>
	}

	return (
		<Box style={styles.container}>
			<Box style={styles.background} />
			<Box>
				<BalanceCard />
				<ActionButton />
			</Box>

			<Box style={styles.transactions}>
				<Typography style={styles.text.label}>Recent Transactions</Typography>
				{data.Items.map(item => {
					return (
						<Item
							key={item.id}
							item={item}
						/>
					);
				})}
			</Box>


		</Box>
	);
}


const styles = {
	container: {
		backgroundColor: "#6d25e5",
	},
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 100,
		height: 200,
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
	},
	moreActionBar: {
		width: 100,
		height: 4,
		backgroundColor: "#ddd",
		borderRadius: 50,
		alignSelf: "center",
		marginBottom: 8,
	},
	transactions: {
		padding: 20,
		gap: 10,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: "#f1f1f1",
	},
	text: {
		label: {
			fontWeight: "bold",
			color: "#aaa",
		},
	},
};
