import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import BubbleSortPage from "./pages/BubbleSortPage";
import HomePage from "./pages/HomePage";
import InsertionSortPage from "./pages/InsertionSortpage";
import MergeSortPage from "./pages/MergeSortPage";
import QuickSortPage from "./pages/QuickSortPage";
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
        <Route path='/sort/quick' element={<QuickSortPage />} />
        <Route path='/sort/merge' element={<MergeSortPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
