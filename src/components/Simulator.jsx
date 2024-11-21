import CurrencyField from "../components/CurrencyField";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, FormGroup } from '@mui/material';
import { setLocalStorageYData, useApp } from "../ThemedApp";

export default function Simulator() {
    const { yData, setYData } = useApp();

    const handleChange = (event) => {
        setLocalStorageYData(yData, setYData, "simulator.preferMethod", event.target.value);
    };

    return (
        <Box sx={{
            height: 400,
            textAlign: "center"
        }}>
            <FormControl>
                <FormLabel>Preferred method</FormLabel>
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
                        }
                    }} />
                    <CurrencyField props={{
                        label: "K ➡︎ ¥", prefix: "K", disabled: yData.simulator.preferMethod != "k2y", value: yData.simulator.k2y.value, 
                        onValueChange: (value) => {
                            setLocalStorageYData(yData, setYData, "simulator.k2y", value);
                        }
                    }} />
                </FormGroup>
            </FormControl>
        </Box>
    );
}