import CurrencyField from "../components/CurrencyField";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, FormGroup, Checkbox, Link, Alert } from '@mui/material';
import { setLocalStorageYData, useApp, getCurrencyFormatter } from "../ThemedApp";

export default function Simulator() {
    const { yData, setYData } = useApp();

    const sbiPricing = {
        "10000": {
            "lawson": 300,
            "yucho": 330,
            "remit": 460
        },
        "50000": {
            "lawson": 300,
            "yucho": 330,
            "remit": 880
        },
        "250000": {
            "lawson": 300,
            "yucho": 500,
            "remit": 1480
        },
        "99999999": {
            "lawson": 300,
            "yucho": 500,
            "remit": 1980
        }
    };

    const calculateHandingCharges = (amount) => {
        if (!amount) {
            return {
                "lawson": "",
                "yucho": "",
                "remit": "",
            }
        }
        const foundPricingAmt = Object.keys(sbiPricing).filter(x => Number(x) >= Number(amount))[0];
        return sbiPricing[foundPricingAmt];
    };

    const handlingChargesFeeLabel = (label) => {
        if (!yData.simulator.sbiPricingObj || !yData.simulator.sbiPricingObj.lawson || !yData.simulator.sbiPricingObj.yucho || !yData.simulator.sbiPricingObj.remit) {
            return "";
        }

        if (label == "remit") {
            return `(¥${getCurrencyFormatter(yData.simulator.sbiPricingObj.remit)})`;
        }

        return `(¥${yData.simulator.atmType === "lawson" ? getCurrencyFormatter(yData.simulator.sbiPricingObj.lawson) : getCurrencyFormatter(yData.simulator.sbiPricingObj.yucho)})`;
    }

    const handleChange = (event) => {
        setLocalStorageYData(yData, setYData, "simulator.preferMethod", event.target.value);
    };

    return (
        <Box sx={{
            height: 600,
            textAlign: "center",
        }}>
            <FormControl sx={{ border: "1px dotted", padding: 3, borderRadius: 5 }}>
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
                        isAllowed: (values) => {
                            const { floatValue } = values;
                            return !floatValue || floatValue >= 0 && floatValue <= 99999999;
                        },
                        label: "¥ ➡︎ K", prefix: "¥", disabled: yData.simulator.preferMethod != "y2k", value: yData.simulator.y2k.value,
                        onValueChange: (value) => {
                            setLocalStorageYData(yData, setYData, "simulator.y2k", value);
                            setLocalStorageYData(yData, setYData, "simulator.sbiPricingObj", calculateHandingCharges(value.value));
                        },
                    }} />
                    <CurrencyField props={{
                        isAllowed: (values) => {
                            const { floatValue } = values;
                            return !floatValue || floatValue >= 0 && floatValue <= 999999999;
                        },
                        label: "K ➡︎ ¥", prefix: "K", disabled: yData.simulator.preferMethod != "k2y", value: yData.simulator.k2y.value,
                        onValueChange: (value) => {
                            setLocalStorageYData(yData, setYData, "simulator.k2y", value);
                        }
                    }} />

                    <FormLabel sx={{ pt: 3 }}>Handling Charges</FormLabel>
                    <FormControlLabel control={<Checkbox checked={yData.simulator.atmFeeCheck ? true : false} />} label={`ATM fee ${handlingChargesFeeLabel("atm")}`} onChange={
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

                    <FormControlLabel control={<Checkbox checked={yData.simulator.remitFeeCheck ? true : false} />} label={`SBI Remit fee ${handlingChargesFeeLabel("remit")}`} onChange={
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