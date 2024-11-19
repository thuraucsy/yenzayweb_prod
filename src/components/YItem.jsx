import { Card, ListItem, ListItemText, IconButton } from "@mui/material";
import { ArrowCircleUp as ArrowCircleUpIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";

export default function Item({ item }) {
	const navigate = useNavigate();

	const CustomButton = styled(IconButton)({
		"&:hover": {
			color: "rgb(255, 0, 157)",
		},
	});

	return (
		<Card sx={{ mb: 2 }}>

			<ListItem secondaryAction={
				<CustomButton onClick={(e) => {
					console.log("arrow click", item)
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
