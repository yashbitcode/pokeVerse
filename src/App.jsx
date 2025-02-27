import { createBrowserRouter, RouterProvider } from "react-router";
import Header from "./Components/Header";
import PokemonsCont from "./Components/PokemonsCont";
import PokemonInfo from "./Pages/PokemonInfo";
import { Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./Utils/services/appStore";
import PokeGPT from "./Pages/PokeGPT";

const AppLayout = () => {
	return (
		<div className="font-[Poppins] px-[1rem] pt-[1rem] pb-[3rem]">
			<Header /> 
			<Outlet />
		</div>
	);
};

const appRoutes = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <PokemonsCont />
			},
			{
				path: "/pokeInfo/:pokeId",
				element: <PokemonInfo />
			},
			{
				path: "/pokeGPT",
				element: <PokeGPT />
			}
		]
	}
]);

const App = () => {
	return (
		<Provider store={appStore}>
			<RouterProvider router={appRoutes} />
		</Provider>
	);
};

export default App;