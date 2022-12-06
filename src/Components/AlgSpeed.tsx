import { useState } from "react";
export type algSpeed =
  | { speed: "Very Fast"; ms: 1 }
  | { speed: "Fast"; ms: 50 }
  | { speed: "Normal"; ms: 250 }
  | { speed: "Slow"; ms: 500 }
  | { speed: "Very Slow"; ms: 800 };

interface AlgSpeedProps {
  UpdateSpeedHandler: (algSpeed: algSpeed) => void;
}
const AlgSpeed: React.FC<AlgSpeedProps> = ({ UpdateSpeedHandler }) => {
  const [toastShow, setToastShow] = useState(false);
  const [algSpeed, setCurAlgSpeed] = useState<algSpeed>({ speed: "Normal", ms: 250 });
  const setAlgSpeed = (algSpeed: algSpeed) => {
    UpdateSpeedHandler(algSpeed);
    setCurAlgSpeed(algSpeed);
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 2000);
  };
  return (
    <div className='dropdown dropdown-hover'>
      <label tabIndex={0} className='btn m-1'>
        Set Speed
      </label>
      <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
        <li>
          <a onClick={() => setAlgSpeed({ speed: "Very Slow", ms: 800 })}>Very Slow</a>
        </li>
        <li>
          <a onClick={() => setAlgSpeed({ speed: "Slow", ms: 500 })}>Slow</a>
        </li>
        <li>
          <a onClick={() => setAlgSpeed({ speed: "Normal", ms: 250 })}>Normal</a>
        </li>
        <li>
          <a onClick={() => setAlgSpeed({ speed: "Fast", ms: 50 })}>Fast</a>
        </li>
        <li>
          <a onClick={() => setAlgSpeed({ speed: "Very Fast", ms: 1 })}>Very Fast</a>
        </li>
      </ul>
      {toastShow && (
        <div className='toast toast-top '>
          <div className='alert alert-success'>
            <div>
              <span className=' whitespace-nowrap'>
                Speed Set to <span className='font-bold'>{algSpeed.speed}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgSpeed;
