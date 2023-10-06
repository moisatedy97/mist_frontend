import { ReactElement, ReactNode, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserInfoStore } from "./stores/authentication/UserStore";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import StorePage from "./pages/StorePage/StorePage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import { I_AuthToken } from "./stores/authentication/AuthTokenStore";
import { accessLocalStorage } from "./stores/browser/SessionStorage";
import { authEndPoints } from "./api/authentication/AuthenticationEndPoints";
import { routerEndPoints } from "./constants/Constants";
import { useNavigate } from "react-router";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Loader from "./components/Loader";
import { useLoaderStore } from "./stores/LoaderStore";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App = (): ReactElement => {
  const navigate = useNavigate();
  const token: I_AuthToken | null = accessLocalStorage.GET_AUTHENTICATION_TOKEN();
  const { isUserLoggedIn, isTokenChecked, setIsUserLoggedIn, setIsTokenChecked, setIsCredentialsChecked } =
    useUserInfoStore((state) => ({
      isUserLoggedIn: state.isUserLoggedIn,
      isTokenChecked: state.isTokenChecked,
      setIsUserLoggedIn: state.setIsUserLoggedIn,
      setIsTokenChecked: state.setIsTokenChecked,
      setIsCredentialsChecked: state.setIsCredentialsChecked,
    }));
  const setIsLoaderActive = useLoaderStore((state) => state.setLoader);
  let ret: ReactNode;

  useEffect(() => {
    if (token) {
      setIsLoaderActive(true);
      authEndPoints
        .API_CHECK_TOKEN()
        .then((response) => {
          if (response.status === 200) {
            setIsUserLoggedIn(true);
            setIsTokenChecked(false);
            setIsCredentialsChecked(true);
            navigate(routerEndPoints.STEAM_PAGE);
          }
        })
        .finally(() => {
          setIsLoaderActive(false);
        });
    }
  }, []);

  if (isTokenChecked) {
    if (token) {
      ret = undefined;
    } else {
      ret = (
        <Routes>
          <Route path={"*"} element={<Navigate to="/signin" replace />} />
          <Route path={"/signin"} element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
        </Routes>
      );
    }
  } else {
    if (isUserLoggedIn) {
      ret = (
        <>
          <Navbar />
          <Loader />
          <Routes>
            <Route path={"/"} element={<Navigate to="/store" replace />} />
            <Route path={"/store"} element={<StorePage />} />
            <Route path={"/library"} element={<LibraryPage />} />
            <Route path={"/community"} element={<CommunityPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
          </Routes>
          <Footer />
        </>
      );
    } else {
      ret = (
        <Routes>
          <Route path={"*"} element={<Navigate to="/signin" replace />} />
          <Route path={"/signin"} element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
        </Routes>
      );
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="flex h-screen flex-col">{ret}</div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
