import { Card, ListItem, ListItemText, IconButton, Slide } from "@mui/material";
import { ArrowCircleUp as ArrowCircleUpIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useApp } from "../ThemedApp";
import { getCurrencyFormatter } from "../ThemedApp";

export default function Item({ item }) {
	const { setYItem, setGlobalMsg } = useApp();

	const CustomButton = styled(IconButton)({
		"&:hover": {
			color: "rgb(255, 0, 157)",
		},
	});

	return (
		<Slide direction="up" in={true} mountOnEnter unmountOnExit>

			<Card sx={{ mb: 2 }}>

				<ListItem secondaryAction={
					<CustomButton onClick={(e) => {
						setYItem(item);
						setGlobalMsg("Simulation Result updated")
					}}>
						<ArrowCircleUpIcon />
					</CustomButton>
				}>
					<ListItemText
						primary={`K${item.MMKRatePerYen} /¥   (or)   ¥${getCurrencyFormatter(100000 / item.MMKRatePerYen)} /1lakh`}
						secondary={`${item.YearMonth.split("/")[1]}/${item.DayTime}`}
					/>
				</ListItem>
			</Card>
		</Slide>
	);
}
