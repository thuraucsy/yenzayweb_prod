import { Box, IconButton, Typography } from "@mui/material";
import { EventTwoTone, CalculateTwoTone, TimelineTwoTone, CurrencyExchangeTwoTone } from "@mui/icons-material";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useApp } from "../ThemedApp";

function ButtonField(props) {
    const { btnType, setBtnType } = useApp();
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    return (

        <IconButton style={styles.actionButton}
            variant="outlined"
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            onClick={() => {
                /** only set the calendar type if not */
                if (btnType != "calendar") {
                    setBtnType("calendar");
                } else {
                    setOpen?.((prev) => !prev)
                }
            }}
        >
            <EventTwoTone style={styles.svgButton} />
        </IconButton>
    );
}

function ButtonDatePicker() {
    const { open, setOpen, calendarValue, setCalendarValue } = useApp();
    const minDate = dayjs('2020/02/15').add(1, 'day');

    return (
        <DatePicker
            displayWeekNumber
            minDate={minDate}
            slots={{ field: ButtonField }}
            slotProps={{ field: { setOpen }, actionBar: {
                actions: ['cancel', 'today', 'accept'],
              }, }}
            label={calendarValue == null ? null : calendarValue.format('YYYY/MM/DD')}
            value={calendarValue}
            onAccept={(newValue) => {
                setCalendarValue(newValue);
            }}
            views={['year', 'month', 'day']}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        />
    );
}

export default function ActionButton({ color, icon, label, path }) {
    const { calendarValue, setBtnType } = useApp();

    return (
        <Box style={styles.actions}>
            <Box style={styles.actionButtonGroup}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ButtonDatePicker />
                </LocalizationProvider>
                <Typography style={styles.text.actionText}>
                    {calendarValue == null ? "Calendar" : calendarValue.format('MM/DD')}
                </Typography>
            </Box>

            <Box style={styles.actionButtonGroup}>
                <IconButton style={{ ...styles.actionButton, ...styles.actionButton.color.scan }} onClick={() => {
                    setBtnType("simulator");
                }}>
                    <CalculateTwoTone style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Simulator
                </Typography>
            </Box>
            <Box style={styles.actionButtonGroup}>
                <IconButton style={{ ...styles.actionButton, ...styles.actionButton.color.rate }} onClick={() => {
                    setBtnType("chart");
                }}>
                    <TimelineTwoTone style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Chart
                </Typography>
            </Box>
            <Box style={styles.actionButtonGroup}>
                <IconButton style={styles.actionButton} onClick={() => {
                    setBtnType("fxRate");
                }}>
                    <CurrencyExchangeTwoTone style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Fx Rate
                </Typography>
            </Box>
        </Box>
    );
}

const styles = {
    actions: {
        display: "flex",
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    action: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    actionButtonGroup: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    actionButton: {
        width: 68,
        height: 68,
        borderRadius: 68,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(255, 0, 157)",
        color: {
            scan: {
                backgroundColor: "rgb(14, 156, 226)",
            },
            rate: {
                backgroundColor: "rgb(123, 72, 244)",
            }
        }
    },
    svgButton: {
        color: "white",
        fontSize: "1.8rem",
    },
    text: {
        actionText: {
            color: "#fff",
            textAlign: "center",
            paddingTop: 4,
        },
    },
};
