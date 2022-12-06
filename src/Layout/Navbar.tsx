import AlgorithmLinks from "./subComponents/AlgorithmLinks";

const Navbar: React.FC = () => {
  return (
    <div className='navbar bg-black text-white'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadowrounded-box w-52 bg-black'
          >
            <AlgorithmLinks />
          </ul>
        </div>
        <a className='btn btn-ghost normal-case text-xl hidden sm:flex'>MMV Algorithm Visualizer</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal p-0'>
          <li tabIndex={0}>
            <a>
              Sorting Algroithms
              <svg
                className='fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
              </svg>
            </a>
            <ul className='p-2 bg-black z-50'>
              <AlgorithmLinks />
            </ul>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <a className='btn'>Home</a>
      </div>
    </div>
  );
};

export default Navbar;
