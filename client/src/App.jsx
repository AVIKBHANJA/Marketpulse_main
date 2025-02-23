import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import StockPredictions from "./components/StockPredictions";
import News from "./pages/News";
import StockAnalysis from "./pages/StockAnalysis";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stockanalysis" element={<StockAnalysis />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<StockPredictions />} />
        <Route path="/news" element={<News />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* <Route path='/update-post/:postId' element={<UpdatePost />} /> */}
        </Route>
      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
