import CurrencyField from "../components/CurrencyField";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, FormGroup } from '@mui/material';
import { setLocalStorage, useApp } from "../ThemedApp";

export default function Simulator() {
    const { preferMethod, setPreferMethod, yData, setYData } = useApp();

    const handleChange = (event) => {
        setPreferMethod(event.target.value);
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
                    <FormControlLabel value="y2k" checked={preferMethod === "y2k"} onChange={handleChange} control={<Radio />} label="¥ ➡︎ K" />
                    <FormControlLabel value="k2y" checked={preferMethod === "k2y"} onChange={handleChange} control={<Radio />} label="K ➡︎ ¥" />
                </RadioGroup>

                <FormGroup sx={{
                    paddingTop: 2,
                }}>
                    <CurrencyField props={{
                        label: "¥ ➡︎ K", prefix: "¥", disabled: preferMethod != "y2k", value: yData.y2k.value, 
                        onValueChange: (value) => {
                            setLocalStorage(yData, setYData, "y2k", value);
                        }
                    }} />
                    <CurrencyField props={{
                        label: "K ➡︎ ¥", prefix: "K", disabled: preferMethod != "k2y", value: yData.k2y.value, 
                        onValueChange: (value) => {
                            setLocalStorage(yData, setYData, "k2y", value);
                        }
                    }} />
                </FormGroup>
            </FormControl>
        </Box>
    );
}