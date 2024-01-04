import useAuth from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setToggleProfile } from "../features/toggleProfile";

const Profile = () => {
  const { signOut } = useAuth();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const toggleProfile = useSelector((state) => state.toggleProfile);

  return (
    <div className="flex items-center relative flex-col md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        className="w-10 h-10 cursor-pointer"
        onClick={() => {
          dispatch(setToggleProfile());
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded-full object-cover w-full h-full border-2 border-gray-500"
          alt="user photo"
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`z-50 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-1 top-9 ${
          toggleProfile ? "" : "hidden"
        }`}
        id="user-dropdown"
      >
        <div className="px-4 py-3 ">
          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
            {auth[1].email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Dashboard
            </button>
          </li>
          <li>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Settings
            </button>
          </li>
          <li>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Earnings
            </button>
          </li>
          <form>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              type="sumbit"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
