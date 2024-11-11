import { Box, IconButton, Typography } from "@mui/material";
import { Fingerprint, QrCodeScanner, CurrencyYen, History } from "@mui/icons-material";

export default function ActionButton({ color, icon, label, path }) {
    return (
        <Box style={styles.actions}>
            <Box style={styles.actionButtonGroup}>
                <IconButton style={styles.actionButton}>
                    <Fingerprint style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Calendar
                </Typography>
            </Box>

            <Box style={styles.actionButtonGroup}>
                <IconButton style={{ ...styles.actionButton, ...styles.actionButton.color.scan }}>
                    <QrCodeScanner style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Simulator
                </Typography>
            </Box>
            <Box style={styles.actionButtonGroup}>
                <IconButton style={{ ...styles.actionButton, ...styles.actionButton.color.rate }}>
                    <CurrencyYen style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Chart
                </Typography>
            </Box>
            <Box style={styles.actionButtonGroup}>
                <IconButton style={styles.actionButton}>
                    <History style={styles.svgButton} />
                </IconButton>
                <Typography style={styles.text.actionText}>
                    Setting
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
