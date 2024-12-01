import { Box, TextField, Autocomplete, List, ListItem, ListItemButton, ListItemText, Slide, Avatar } from '@mui/material';
import { useApp, setLocalStorageYData } from '../ThemedApp';
import { useEffect } from "react";
import { useQuery } from "react-query";
import CurrencyField from "../components/CurrencyField";
import { getCurrencyFormatter } from "../ThemedApp";

export default function FxRate() {
    const { yData, setYData } = useApp();

    const { isLoading, isError, error, data } = useQuery(["fxrate", yData], async () => {
        if (yData.fxRate.selectedCountry) {
            const apiUrl = `https://api.frankfurter.app/latest?from=${(yData.fxRate.selectedCountry.currencyCode.toLowerCase())}`;
            const res = await fetch(apiUrl);
            return res.json();
        }
    }, {
        enabled: !yData.fxRate !== undefined || !yData.fxRate.selectedCountry !== undefined || yData.fxRate.selectedCountry.currencyCode !== undefined,
        retry: 1,
    });

    useEffect(() => {
        if (data) {
            console.log("data", data);
        }
    }, [data]);

    const convert = code => {
        const selectedCountryAmt = yData.fxRate.selectedCountry.amt > 0 ? yData.fxRate.selectedCountry.amt : 1;
        if (!data || !data.rates[code]) return 0;

        return ` ${code} ${getCurrencyFormatter(selectedCountryAmt * data.rates[code])}`;
    };

    return (
        <Box sx={{
            minHeight: 600,
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 3,
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Autocomplete
                    sx={{ width: 300, pb: 2 }}
                    id="country-select-demo"
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                {...optionProps}
                            >
                                <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt=""
                                />
                                {option.label} ({option.currencyCode}) {option.phone}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="The country you are visiting"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                },
                            }}
                        />
                    )}
                    onChange={(event, newValue) => {
                        console.log("newValue", newValue)
                        let newlySelectedCountry = newValue;
                        if (newValue) {
                            newlySelectedCountry = { ...newValue, amt: "" }
                        }
                        setLocalStorageYData(yData, setYData, "fxRate.selectedCountry", newlySelectedCountry);
                    }}
                    value={(yData.fxRate && yData.fxRate.selectedCountry) ? yData.fxRate.selectedCountry : null}
                />
                {
                    yData.fxRate && yData.fxRate.selectedCountry ?
                        <Box>
                            <CurrencyField
                                props={{
                                    isAllowed: (values) => {
                                        const { floatValue } = values;
                                        return !floatValue || floatValue >= 0 && floatValue <= 999999999999;
                                    },
                                    label: yData.fxRate.selectedCountry.currencyCode,
                                    value: yData.fxRate.selectedCountry.amt,
                                    onValueChange: (values) => {
                                        const newlySelectedCountry = { ...yData.fxRate.selectedCountry, amt: values.value }
                                        setLocalStorageYData(yData, setYData, "fxRate.selectedCountry", newlySelectedCountry);
                                    },
                                }}
                                propsDelIcon={{
                                    onClick: () => {
                                        const newlySelectedCountry = { ...yData.fxRate.selectedCountry, amt: "" }
                                        setLocalStorageYData(yData, setYData, "fxRate.selectedCountry", newlySelectedCountry);
                                    }
                                }} />


                            {
                                countries.map((item, i, array) => {
                                    return (
                                        item.code === yData.fxRate.selectedCountry.code ?
                                            <Box key={item.code} /> :
                                            <Slide direction="up" in={true} mountOnEnter unmountOnExit key={item.code}>
                                                <List
                                                    sx={{ bgcolor: "white", borderBottom: "1px dotted", borderRadius: 2 }}
                                                >
                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <Avatar variant="square" src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`} sx={{ bgcolor: "white", width: 40, height: 27 }} />
                                                            <ListItemText primary={convert(item.currencyCode)} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </List>
                                            </Slide>
                                    );
                                })
                            }

                        </Box>
                        : <Box />
                }

            </Box>
        </Box>
    );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
    { code: 'AU', currencyCode: 'AUD', label: 'Australia', phone: '+61' },
    { code: 'BG', currencyCode: 'BGN', label: 'Bulgaria', phone: '+359' },
    { code: 'BR', currencyCode: 'BRL', label: 'Brazil', phone: '+55' },
    { code: 'CA', currencyCode: 'CAD', label: 'Canada', phone: '+1' },
    { code: 'CH', currencyCode: 'CHF', label: 'Switzerland', phone: '+41' },
    { code: 'CN', currencyCode: 'CNY', label: 'China', phone: '+86' },
    { code: 'CZ', currencyCode: 'CZK', label: 'Czech Republic', phone: '+420' },
    { code: 'DK', currencyCode: 'DKK', label: 'Denmark', phone: '+45' },
    { code: 'EU', currencyCode: 'EUR', label: 'Europe', phone: '' },
    { code: 'GB', currencyCode: 'GBP', label: 'United Kingdom', phone: '+44' },
    { code: 'HK', currencyCode: 'HKD', label: 'Hong Kong', phone: '+852' },
    { code: 'HU', currencyCode: 'HUF', label: 'Hungary', phone: '+36' },
    { code: 'ID', currencyCode: 'IDR', label: 'Indonesia', phone: '+62' },
    { code: 'IL', currencyCode: 'ILS', label: 'Israel', phone: '+972' },
    { code: 'IN', currencyCode: 'INR', label: 'India', phone: '+91' },
    { code: 'IS', currencyCode: 'ISK', label: 'Iceland', phone: '+354' },
    { code: 'JP', currencyCode: 'JPY', label: 'Japan', phone: '+81' },
    { code: 'KR', currencyCode: 'KRW', label: 'Korea, Republic of', phone: '+82' },
    { code: 'MX', currencyCode: 'MXN', label: 'Mexico', phone: '+52' },
    { code: 'MY', currencyCode: 'MYR', label: 'Malaysia', phone: '+60' },
    { code: 'NO', currencyCode: 'NOK', label: 'Norway', phone: '+47' },
    { code: 'NZ', currencyCode: 'NZD', label: 'New Zealand', phone: '+64' },
    { code: 'PH', currencyCode: 'PHP', label: 'Philippines', phone: '+63' },
    { code: 'PL', currencyCode: 'PLN', label: 'Poland', phone: '+48' },
    { code: 'RO', currencyCode: 'RON', label: 'Romania', phone: '+40' },
    { code: 'SE', currencyCode: 'SEK', label: 'Sweden', phone: '+46' },
    { code: 'SG', currencyCode: 'SGD', label: 'Singapore', phone: '+65' },
    { code: 'TH', currencyCode: 'THB', label: 'Thailand', phone: '+66' },
    { code: 'TR', currencyCode: 'TRY', label: 'Turkey', phone: '+90' },
    { code: 'ZA', currencyCode: 'ZAR', label: 'South Africa', phone: '+27' },
];
