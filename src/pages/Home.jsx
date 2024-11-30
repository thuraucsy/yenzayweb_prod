import { Box } from "@mui/material";

import SimulationResult from "../components/SimulationResult";
import ActionButton from "../components/ActionButton";
import Calendar from "../components/Calendar";
import Simulator from "../components/Simulator";
import Chart from "../components/Chart";
import FxRate from "../components/FxRate";
import { useApp } from "../ThemedApp";

function SelectedItem() {
	const { btnType } = useApp();
	if (btnType == "simulator") {
		return <Simulator />;
	} else if (btnType == "chart") {
		return <Chart />;
	} else if (btnType == "fxRate") {
		return <FxRate />;
	}
	return <Calendar />
}

export default function Home() {
	return (
		<Box style={styles.container}>
			<Box style={styles.background} />
			<SimulationResult />
			<Box>
				<ActionButton />
			</Box>
			<Box style={styles.transactions}>
				<SelectedItem />
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
