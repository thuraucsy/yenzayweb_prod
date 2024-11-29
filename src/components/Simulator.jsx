import CurrencyField from "../components/CurrencyField";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, FormGroup, Checkbox, Link, Alert } from '@mui/material';
import { setLocalStorageYData, useApp } from "../ThemedApp";

export default function Simulator() {
    const { yData, setYData } = useApp();

    const handleChange = (event) => {
        setLocalStorageYData(yData, setYData, "simulator.preferMethod", event.target.value);
    };

    return (
        <Box sx={{
            height: 600,
            textAlign: "center",
        }}>
            <FormControl sx={{ border: "1px dotted", padding: 3, borderRadius: 5}}>
                <FormLabel>Preferred Method</FormLabel>
                <RadioGroup
                    row
                >
                    <FormControlLabel value="y2k" checked={yData.simulator.preferMethod === "y2k"} onChange={handleChange} control={<Radio />} label="¥ ➡︎ K" />
                    <FormControlLabel value="k2y" checked={yData.simulator.preferMethod === "k2y"} onChange={handleChange} control={<Radio />} label="K ➡︎ ¥" />
                </RadioGroup>

                <FormGroup sx={{
                    paddingTop: 2,
                }}>
                    <CurrencyField props={{
                        label: "¥ ➡︎ K", prefix: "¥", disabled: yData.simulator.preferMethod != "y2k", value: yData.simulator.y2k.value,
                        onValueChange: (value) => {
                            setLocalStorageYData(yData, setYData, "simulator.y2k", value);
                        },
                    }} />
                    <CurrencyField props={{
                        label: "K ➡︎ ¥", prefix: "K", disabled: yData.simulator.preferMethod != "k2y", value: yData.simulator.k2y.value,
                        onValueChange: (value) => {
                            setLocalStorageYData(yData, setYData, "simulator.k2y", value);
                        }
                    }} />

                    <FormLabel sx={{ pt: 3 }}>Handling Charges</FormLabel>
                    <FormControlLabel control={<Checkbox checked={yData.simulator.atmFeeCheck ? true : false} />} label="ATM fee (¥100)" onChange={
                        (event) => {
                            setLocalStorageYData(yData, setYData, "simulator.atmFeeCheck", event.target.checked);
                        }
                    } />

                    <RadioGroup row sx={{ pl: 3 }} value={yData.simulator.atmType ? yData.simulator.atmType : "lawson"} onChange={
                        (event) => {
                            setLocalStorageYData(yData, setYData, "simulator.atmType", event.target.value);
                        }
                    }>
                        <FormControlLabel value="lawson" control={<Radio />} label="Lawson ATM" disabled={yData.simulator.atmFeeCheck ? false : true} />
                        <FormControlLabel value="yucho" control={<Radio />} label="Yūcho ATM" disabled={yData.simulator.atmFeeCheck ? false : true} />
                    </RadioGroup>

                    <FormControlLabel control={<Checkbox checked={yData.simulator.remitFeeCheck ? true : false} />} label="SBI Remit fee (¥1,980)" onChange={
                        (event) => {
                            setLocalStorageYData(yData, setYData, "simulator.remitFeeCheck", event.target.checked);
                        }
                    } />

                    <Alert severity="warning">Min transfer amount must be from ¥2,000 <Link href="/sbi_pricing2.jpg" target="_blank">Check SBI Pricing Detail</Link>
                    </Alert>
                </FormGroup>
            </FormControl>
        </Box>
    );
}