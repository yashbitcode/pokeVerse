import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import Header from "./Components/Header";
import PokemonsCont from "./Components/PokemonsCont";
import PokemonInfo from "./Pages/PokemonInfo";
import { Outlet } from "react-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./Utils/services/appStore";
import PokeGPT from "./Pages/PokeGPT";
import PokeAIRecognizer from "./Pages/PokeAIRecognizer";
import Home from "./Pages/Home";
import authService from "./appwrite/auth";
import { addAccStatus } from "./Utils/services/userInfoSlice";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./Components/Shimmer";
import PokeQuizBase from "./Pages/PokeQuizBase";
import QuizComp from "./Components/QuizComp";

const AppLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accStatus = useSelector((store) => store.userInfo.accStatus);
	const [loading, setLoading] = useState(true);

	const getAccStatus = async () => {
		try {
			const acc = await authService.getAccount();
			dispatch(addAccStatus(acc));
		}
		catch(err) {}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if(accStatus) {
			if(location.pathname === "/") navigate("/pokemons/1");
		} 
		else if(!accStatus && !loading) {
			if(location.pathname !== "/") navigate("/");
		}
		else {	
			getAccStatus();
		}
	}, [accStatus, loading]);

	return (
		<div className="font-[Poppins] w-full pb-[2rem]">
			<Header /> 
			{
				(loading || (accStatus && location.pathname === "/") || (!accStatus && location.pathname !== "/")) ? (
					<LoadingScreen />
				) : <Outlet />
			}
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
				element: <Home />
			},
			{
				path: "/pokemons/:pageId",
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
				element: <PokeQuizBase />
			},
			{
				path: "/quiz/:quizId",
				element: <QuizComp />
			},
			{
				path: "/pokeRecognizer",
				element: <PokeAIRecognizer />
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