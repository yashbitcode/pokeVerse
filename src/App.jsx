import { createBrowserRouter, RouterProvider } from "react-router";
import Header from "./Components/Header";
import PokemonsCont from "./Components/PokemonsCont";
import PokemonInfo from "./Pages/PokemonInfo";
import { Outlet } from "react-router";

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
			}
		]
	}
]);

const App = () => {
	return <RouterProvider router={appRoutes} />
}

export default App;