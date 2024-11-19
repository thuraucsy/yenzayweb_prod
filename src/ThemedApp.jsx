import { useState, createContext, useContext, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { deepPurple, grey } from "@mui/material/colors";

import { QueryClientProvider, QueryClient } from "react-query";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chart from "./pages/Chart";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";

const AppContext = createContext();

export const queryClient = new QueryClient();

export function useApp() {
	return useContext(AppContext);
}

export function setLocalStorage(yData, setYData, field, value) {
	const yData_ = { ...yData };
	yData_[field] = value;
	setYData(yData_);
	localStorage.setItem("yData", JSON.stringify(yData_));
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Template />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/Chart",
				element: <Chart />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/comments/:id",
				element: <Comments />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/likes/:id",
				element: <Likes />,
			},
		],
	},
]);

export default function ThemedApp() {
	const localYData = localStorage.getItem("yData") ? JSON.parse(localStorage.getItem("yData")) : {
		version: 1,
		y2k: {
			formattedValue: "¥10,000",
			value: "10000",
			floatValue: 10000
		},
		k2y: {
			formattedValue: "¥100,000",
			value: "100000",
			floatValue: 100000
		},
		yitem: {},
		yenOrGoldToggle: "yen",
		btnType: "calendar",
	};

	const [showDrawer, setShowDrawer] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [globalMsg, setGlobalMsg] = useState(null);
	const [auth, setAuth] = useState(null);
	const [mode, setMode] = useState("light");
	const [calendarValue, setCalendarValue] = useState(null);
	const [open, setOpen] = useState(false);
	const [btnType, setBtnType] = useState(localYData.btnType);
	const [preferMethod, setPreferMethod] = useState("y2k"); /** y2k or k2y */
	const [yData, setYData] = useState(localYData);

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
				primary: deepPurple,
				banner: mode === "dark" ? grey[800] : grey[200],
				text: {
					fade: grey[500],
				},
			},
		});
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider
				value={{
					showDrawer,
					setShowDrawer,
					showForm,
					setShowForm,
					globalMsg,
					setGlobalMsg,
					auth,
					setAuth,
					mode,
					setMode,
					calendarValue,
					setCalendarValue,
					open,
					setOpen,
					btnType,
					setBtnType,
					preferMethod,
					setPreferMethod,
					yData,
					setYData,
				}}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
