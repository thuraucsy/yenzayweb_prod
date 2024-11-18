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
	const [showDrawer, setShowDrawer] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [globalMsg, setGlobalMsg] = useState(null);
	const [auth, setAuth] = useState(null);
	const [mode, setMode] = useState("light");
	const [calendarValue, setCalendarValue] = useState(null);
	const [open, setOpen] = useState(false);
	const [btnType, setBtnType] = useState("calendar");

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
				}}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
