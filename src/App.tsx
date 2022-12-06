import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import BubbleSortPage from "./pages/BubbleSortPage";
import HomePage from "./pages/HomePage";
import InsertionSortPage from "./pages/InsertionSortpage";
import SelectionSortPage from "./pages/SelectionSortPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sort/bubble' element={<BubbleSortPage />} />
        <Route path='/sort/selection' element={<SelectionSortPage />} />
        <Route path='/sort/insertion' element={<InsertionSortPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
