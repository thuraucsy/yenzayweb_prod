import { Box, TextField, Autocomplete, List, ListItem, ListItemAvatar, ListItemText, Slide, Avatar, IconButton } from '@mui/material';
import { useApp, setLocalStorageYData } from '../ThemedApp';
import { useQuery } from "react-query";
import CurrencyField from "../components/CurrencyField";
import { getCurrencyFormatter } from "../ThemedApp";
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

const api = import.meta.env.VITE_FX_RATE_API;

export default function FxRate() {
    const { yData, setYData } = useApp();

    const { isLoading, isError, error, data } = useQuery(["fxrate", yData.fxRate.selectedCountry], async () => {
        if (yData.fxRate.selectedCountry) {
            const apiUrl = `${api}/latest?from=${(yData.fxRate.selectedCountry.currencyCode.toLowerCase())}`;
            const res = await fetch(apiUrl);
            return res.json();
        }
    }, {
        enabled: !yData.fxRate !== undefined || !yData.fxRate.selectedCountry !== undefined || yData.fxRate.selectedCountry.currencyCode !== undefined,
        retry: 1,
    });

    const convert = code => {
        const selectedCountryAmt = yData.fxRate.amt > 0 ? yData.fxRate.amt : 1;
        if (!data || !data.rates[code]) return 0;

        return `${getCurrencyFormatter(selectedCountryAmt * data.rates[code], 6)}`;
    };

    yData.fxRate.fav = yData.fxRate.fav ?? [];
    const favCountries = countries.filter(item => yData.fxRate.fav.includes(item.code));
    const notFavCountries = countries.filter(item => !yData.fxRate.fav.includes(item.code));
    const sortedCountries = [...favCountries, ...notFavCountries];

    return (
        <Box sx={{
            minHeight: 600,
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px dotted",
                padding: 3,
                borderRadius: 5
            }}>
                <Autocomplete
                    sx={{ width: 300, pb: 2 }}
                    id="country-select-demo"
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => `${option.label} (${option.currencyCode})`}
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
                                    src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
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
                        setLocalStorageYData(yData, setYData, "fxRate.selectedCountry", newValue);
                    }}
                    value={(yData.fxRate && yData.fxRate.selectedCountry) ? yData.fxRate.selectedCountry : null}
                />
                {
                    yData.fxRate && yData.fxRate.selectedCountry ?
                        <Box>
                            <Box sx={{ mb: 3 }}>
                                <CurrencyField
                                    props={{
                                        isAllowed: (values) => {
                                            const { floatValue } = values;
                                            return !floatValue || floatValue >= 0 && floatValue <= 999999999999;
                                        },
                                        label: yData.fxRate.selectedCountry.currencyCode,
                                        value: yData.fxRate.amt,
                                        onValueChange: (values) => {
                                            setLocalStorageYData(yData, setYData, "fxRate.amt", values.value);
                                        },
                                        decimalScale: 6
                                    }}
                                    propsDelIcon={{
                                        onClick: () => {
                                            setLocalStorageYData(yData, setYData, "fxRate.amt", "");
                                        }
                                    }} />
                            </Box>


                            {
                                sortedCountries.map((item, i, array) => {
                                    return (
                                        item.code === yData.fxRate.selectedCountry.code ?
                                            <Box key={item.code} /> :
                                            <Slide direction="up" in={true} mountOnEnter unmountOnExit key={item.code}>
                                                <List
                                                    sx={{ bgcolor: "white", borderRadius: 2, marginBottom: 2 }}
                                                >
                                                    <ListItem secondaryAction={
                                                        <IconButton edge="end" aria-label="favorite" onClick={() => {
                                                            let fav = [];
                                                            if (yData.fxRate.fav.includes(item.code)) {
                                                                fav = yData.fxRate.fav.filter(x => x !== item.code)
                                                            } else {
                                                                fav = [...yData.fxRate.fav, item.code];
                                                            }

                                                            setLocalStorageYData(yData, setYData, "fxRate.fav", fav);
                                                        }}>
                                                            <FavoriteIcon sx={{ color: yData.fxRate.fav.includes(item.code) ? pink[500] : null }} />
                                                        </IconButton>
                                                    }>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                variant="square"
                                                                src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                                                                sx={{ bgcolor: "white", width: 40, height: 27 }} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.label} secondary={item.currencyCode + " " + convert(item.currencyCode)} />
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
    { code: 'KR', currencyCode: 'KRW', label: 'Republic of Korea', phone: '+82' },
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
    { code: 'US', currencyCode: 'USD', label: 'United States', phone: '+1' },
    { code: 'ZA', currencyCode: 'ZAR', label: 'South Africa', phone: '+27' },
];
