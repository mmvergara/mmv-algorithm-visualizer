import { Route, Routes } from "react-router-dom";
import "./App.css";
import BubbleSort from "./Components/BubbleSort";
import SelectionSort from "./Components/SelectionSort";
import Navbar from "./Layout/Navbar";
import BubbleSortPage from "./pages/BubbleSortPage";
import HomePage from "./pages/HomePage";
import SelectionSortPage from "./pages/SelectionSortPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sort/bubble' element={<BubbleSortPage />} />
        <Route path='/sort/selection' element={<SelectionSortPage />} />
      </Routes>
    </>
  );
}

export default App;
