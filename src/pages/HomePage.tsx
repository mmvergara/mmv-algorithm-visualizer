import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import AlgorithmLinks from "../Layout/subComponents/AlgorithmLinks";

const HomePage: React.FC = () => {
  return (
    <section className='text-black flex flex-col w-[100%] h-[85vh] items-center '>
      <h1 className='mt-7 text-3xl sm:text-6xl font-Poppins font-semibold'>Algorithm Visualizer</h1>
      <p className='my-7 text-1xl font-Poppins font-semibold  text-center'>
        Made By: Vergara, Mark Matthew <br /> PSAU BSIT 2-A S.Y. 2022-2023{" "}
      </p>
      <p className='font-semibold mb-4 btn btn-accent'>Pick an algorithm to visualize </p>
      <ul className='flex flex-col justify-center items-center gap-2 '>
        <div className='flex gap-2'>
          <li>
            <Link className='btn' to='/sort/selection'>
              Selection Sort
            </Link>
          </li>
          <li>
            <Link className='btn' to='/sort/bubble'>
              Bubble Sort
            </Link>
          </li>
        </div>
        <div className='flex gap-2'>
          <li>
            <Link className='btn' to='/sort/merge'>
              Merge Sort
            </Link>
          </li>
          <li>
            <Link className='btn' to='/sort/quick'>
              Quick Sort
            </Link>
          </li>
        </div>
        <li>
          <Link className='btn' to='/sort/insertion'>
            Insertion Sort
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default HomePage;
