import { Card, ListItem, ListItemText, IconButton, Slide, Box, ListItemIcon } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { ArrowCircleUp as ArrowCircleUpIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useApp } from "../ThemedApp";
import { getCurrencyFormatter } from "../ThemedApp";

export default function Item({ item, prevItem }) {
	const { setYItem, setGlobalMsg, yItem } = useApp();

	const CustomButton = styled(IconButton)({
		"&:hover": {
			color: "rgb(255, 0, 157)",
		},
	});

	return (
		<Slide direction="up" in={true} mountOnEnter unmountOnExit>

			<Card sx={{ mb: 2 }}>

				<ListItem secondaryAction={yItem.MMKRatePerYen !== item.MMKRatePerYen ?
					<CustomButton onClick={(e) => {
						setYItem(item);
						setGlobalMsg("Simulation Result updated")
					}}>
						<ArrowCircleUpIcon />
					</CustomButton> : <Box />
				}>
					<ListItemText style={(prevItem && prevItem.MMKRatePerYen !== item.MMKRatePerYen) ? styles.changedStyle : null}
						primary={`K${item.MMKRatePerYen} /¥   (or)   ¥${getCurrencyFormatter(100000 / item.MMKRatePerYen)} /1lakh`}
						secondary={`${item.YearMonth.split("/")[1]}/${item.DayTime}`}
					/>
				</ListItem>
			</Card>
		</Slide>
	);
}

const styles = {
    changedStyle: {
		fontWeight: "bold",
		color: "rgb(249, 19, 161)",
	}
}