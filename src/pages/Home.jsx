import { Box, Alert, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Alarm as AlarmIcon, AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

import Item from "../components/YItem";

import { queryClient, useApp } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";
import BalanceCard from "../components/BalanceCard";

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
		<Box style={styles.green}>
			<Box>
				<BalanceCard />

				<Box style={styles.actions}>
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
					<IconButton aria-label="delete" disabled color="primary">
						<DeleteIcon />
					</IconButton>
					<IconButton color="secondary" aria-label="add an alarm">
						<AlarmIcon />
					</IconButton>
					<IconButton color="primary" aria-label="add to shopping cart">
						<AddShoppingCartIcon />
					</IconButton>
				</Box>
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
	green: {
		// background: "green",
		backgroundColor: `rgba(109, 37, 229, 1.00)`,
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
		backgroundImage: `linear-gradient(90deg, #0062ff, #da61ff)`,
	},
	actions: {
		paddingTop: 30,
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 25,
		flexDirection: "row",
		justifyContent: "space-between",
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
