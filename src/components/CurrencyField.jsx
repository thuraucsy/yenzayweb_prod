// import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { TextField, Box, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export default function CurrencyField({ props, propsDelIcon }) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
        }}>
            <NumericFormat style={styles.numericFormat}
                customInput={TextField}
                size="small"
                variant="outlined"
                sx={{ width: '30ch' }}
                thousandSeparator=","
                type="tel"
                {...props}
            />
            <IconButton aria-label="delete" {...propsDelIcon}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

const styles = {
    numericFormat: {
        padding: "14px 0px",
        width: "90%",
    }
}