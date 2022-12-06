import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import HomePage from "./Components/HomePage";
import Loading from "./Components/Loading";
import "./App.css";

const BubbleSortPage = lazy(() => import("./Components/BubbleSort"));
const MergeSortPage = lazy(() => import("./Components/MergeSort"));
const QuickSortPage = lazy(() => import("./Components/QuickSort"));
const SelectionSortPage = lazy(() => import("./Components/SelectionSort"));
const InsertionSortingPage = lazy(() => import("./Components/InsertionSort"));

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sort/bubble' element={<BubbleSortPage />} />
            <Route path='/sort/selection' element={<SelectionSortPage />} />
            <Route path='/sort/insertion' element={<InsertionSortingPage />} />
            <Route path='/sort/quick' element={<QuickSortPage />} />
            <Route path='/sort/merge' element={<MergeSortPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
