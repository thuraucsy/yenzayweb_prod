// import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material"

export default function CurrencyField({ props }) {

    return (
        <NumericFormat style={styles.numericFormat}
            customInput={TextField}
            size="small"
            variant="outlined"
            sx={{ width: '30ch' }}
            thousandSeparator=","
            type="tel"
            {...props}
        />
    );
}

const styles = {
    numericFormat: {
        padding: "14px 0px",
    }
}