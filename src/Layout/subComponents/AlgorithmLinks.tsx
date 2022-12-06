import { Link } from "react-router-dom";
const AlgorithmLinks: React.FC = () => {
  return (
    <>
      <li>
        <Link to='/sort/bubble'>Bubble Sort</Link>
      </li>
      <li>
        <Link to='/sort/quick'>Quick Sort</Link>
      </li>
      <li>
        <Link to='/sort/insertion'>Insertion Sort</Link>
      </li>
      <li>
        <Link to='/sort/selection'>Selection Sort</Link>
      </li>
      <li>
        <Link to='/sort/merge'>Merge Sort</Link>
      </li>
    </>
  );
};

export default AlgorithmLinks;
