import { Card, ListItem, ListItemText, IconButton } from "@mui/material";
import { ArrowCircleUp as ArrowCircleUpIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useApp } from "../ThemedApp";

export default function Item({ item }) {
	const { setYItem } = useApp();

	const CustomButton = styled(IconButton)({
		"&:hover": {
			color: "rgb(255, 0, 157)",
		},
	});

	return (
		<Card sx={{ mb: 2 }}>

			<ListItem secondaryAction={
				<CustomButton onClick={(e) => {
					setYItem(item);
				}}>
					<ArrowCircleUpIcon />
				</CustomButton>
			}>
				<ListItemText
					primary={`K${item.MMKRatePerYen} /¥   (or)   ¥${Math.round(100000 / item.MMKRatePerYen)} /1lakh`}
					secondary={`${item.YearMonth.split("/")[1]}/${item.DayTime}`}
				/>
			</ListItem>
		</Card>
	);
}
