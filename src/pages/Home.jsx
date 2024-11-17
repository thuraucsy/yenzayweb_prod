import { Box, Alert, Typography, IconButton } from "@mui/material";
import { useApp } from "../ThemedApp";

import Item from "../components/YItem";

import { useQuery } from "react-query";
import SummaryCard from "../components/SummaryCard";
import ActionButton from "../components/ActionButton";

const api = import.meta.env.VITE_YENZAY_API;

export default function Home() {
	const { calendarValue } = useApp();

	const { isLoading, isError, error, data } = useQuery(["yenzay", calendarValue], async ({ queryKey }) => {
		const [_, calendarValue] = queryKey
		let apiUrl = `${api}/day/today.json`;

		/** calendarValue change && not today date */
		if (calendarValue && calendarValue.format("YYYY/MM/DD") !== new Date().toLocaleDateString("ja-JP", {
			year: "numeric", month: "2-digit",
			day: "2-digit"
		})) {
			apiUrl = `${api}/month/${calendarValue.format("YYYYMM")}.json`;
		}
		const res = await fetch(apiUrl);
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
			<SummaryCard />
			<Box>
				<ActionButton />
			</Box>

			<Box style={styles.transactions}>
				<Typography style={{ ...styles.text.label, ...styles.text.label.summaryCard }}>{data.Items[0].YearMonth}/{data.Items[0].DayTime}</Typography>
				<Typography style={styles.text.label}>{data.Items[0].YearMonth}/{data.Items[0].DayTime.split(` `)[0]}</Typography>

				{
					data.Items.slice().reverse().map(item => {
						return (
							<Item
								key={item.YearMonth + item.DayTime}
								item={item}
							/>
						);
					})
				}
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
			color: "rgb(249 19 161)",
			paddingBottom: 6,
			position: "sticky",
			top: 120,
			zIndex: 20,
			textAlign: "center",
			summaryCard: {
				color: "#aaa",
				position: "fixed",
				top: 120,
				left: 46,
				right: 0,
				margin: "auto",
			}
		},
	},
};
