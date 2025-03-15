import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import Header from "./Components/Header";
import PokemonsCont from "./Pages/PokemonsCont";
import PokemonInfo from "./Pages/PokemonInfo";
import { Outlet } from "react-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./Utils/services/appStore";
import PokeGPT from "./Pages/PokeGPT";
import Home from "./Pages/Home";
import authService from "./appwrite/auth";
import { addAccStatus } from "./Utils/services/userInfoSlice";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./Components/Shimmer";
import PokeBase from "./Pages/PokeBase";
import QuizComp from "./Pages/QuizComp";
import AllBasePreview from "./Components/AllBasePreview";
import QuizDetailsComp from "./Components/QuizDetailsComp";
import RecognizeDetailsComp from "./Components/RecognizeDetailsComp";
import { getAllQuizPreview, getAllRecognizePreview } from "./Utils/helpers";
import PokeRecognitionCont from "./Pages/PokeRecognitionCont";

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
		else getAccStatus();
	});

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
				path: "/quiz/:quizId",
				element: <QuizComp />
			},
			{
				path: "/pokeAIQuiz",
				element: <PokeBase key={"quiz-preview"} PreviewComp={AllBasePreview} DetailsComp={QuizDetailsComp} previewType={"quiz"} getPreviewData={getAllQuizPreview} />
			},
			{
				path: "/pokeRecognizer",
				element: <PokeBase key={"recog-preview"} PreviewComp={AllBasePreview} DetailsComp={RecognizeDetailsComp} previewType={"recognize"} getPreviewData={getAllRecognizePreview} />
			},
			{
				path: "/recognize/:recogId",
				element: <PokeRecognitionCont />
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