import { Typography, Box, IconButton } from "@mui/material";
import { Fingerprint, QrCodeScanner, CurrencyYen, History } from "@mui/icons-material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export default function ActionButton({ color, icon, label, path }) {
    return (
        <Box style={styles.actions}>
            <IconButton style={styles.actionButton}>
                <Fingerprint style={styles.svgButton} />
            </IconButton>
            <IconButton style={{...styles.actionButton, ...styles.actionButton.color.scan}}>
                <QrCodeScanner style={styles.svgButton} />
            </IconButton>
            <IconButton style={{...styles.actionButton, ...styles.actionButton.color.rate}}>
                <CurrencyYen style={styles.svgButton} />
            </IconButton>
            <IconButton style={styles.actionButton}>
                <History style={styles.svgButton} />
            </IconButton>
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
        },
    },
};
