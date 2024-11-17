import { Box } from "@mui/material";

import SummaryCard from "../components/SummaryCard";
import ActionButton from "../components/ActionButton";
import HomeItem from "../components/HomeItem";

export default function Home() {

	return (
		<Box style={styles.container}>
			<Box style={styles.background} />
			<SummaryCard />
			<Box>
				<ActionButton />
			</Box>
			<Box style={styles.transactions}>
				<HomeItem />
			</Box>
		</Box>
	);
}


const styles = {
	transactions: {
		padding: 20,
		gap: 10,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: "#f1f1f1",
	},
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
	}
};
