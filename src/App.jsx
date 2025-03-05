import { createBrowserRouter, RouterProvider } from "react-router";
import Header from "./Components/Header";
import PokemonsCont from "./Components/PokemonsCont";
import PokemonInfo from "./Pages/PokemonInfo";
import { Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./Utils/services/appStore";
import PokeGPT from "./Pages/PokeGPT";
import PokeAIQuiz from "./Pages/PokeAIQuiz";

const AppLayout = () => {
	return (
		<div className="font-[Poppins] w-full pb-[2rem]">
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
			},
			{
				path: "/pokeAIQuiz",
				element: <PokeAIQuiz />
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