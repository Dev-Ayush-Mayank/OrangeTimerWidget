import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const HeaderLanding = ({
  showLogin,
  showRegister,
  showNavItems,
}: {
  showLogin: boolean;
  showRegister: boolean;
  showNavItems: boolean;
}) => {
  return (
    <header className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <Logo />
          {showNavItems && (
            <div className='hidden md:block'>
              <nav aria-label='Global'>
                <ul className='flex items-center gap-6 text-sm'>
                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      Careers{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      History{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      Services{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      Projects{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href='#'
                    >
                      {" "}
                      Blog{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4'>
              {showLogin && (
                <Link
                  className='rounded-full bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white'
                  to='/login'
                >
                  Login
                </Link>
              )}
              {showRegister && (
                <div className='hidden sm:flex'>
                  <Link
                    className='rounded-full bg-gray-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200'
                    to='/register'
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className='block md:hidden'>
              <button className='rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
