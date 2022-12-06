import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import HomePage from "./pages/HomePage";
import Loading from "./Components/Loading";
import "./App.css";

const BubbleSortPage = lazy(() => import("./pages/BubbleSortPage"));
const MergeSortPage = lazy(() => import("./pages/MergeSortPage"));
const QuickSortPage = lazy(() => import("./pages/QuickSortPage"));
const SelectionSortPage = lazy(() => import("./pages/SelectionSortPage"));
const InsertionSortPage = lazy(() => import("./pages/InsertionSortPage"));

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
            <Route path='/sort/insertion' element={<InsertionSortPage />} />
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
