import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { setDarkMode, darkMode } = useContext(AppContext);
  return (
    <div
      className={`flex items-center justify-center min-h-screen w-full transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`relative text-center p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl max-w-md w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 border transition-all ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-gray-300 text-gray-800"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Title */}
        <h1 className="text-3xl mt-5 sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
          🔮 VanishVote
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
          Create anonymous polls that disappear after a set time. Stay unseen,
          stay anonymous.
        </p>

        {/* Create Poll Button */}
        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-indigo-700 transition-all shadow-md text-sm sm:text-base"
        >
          🚀 Create a Poll
        </button>
      </div>
    </div>
  );
};
export default Home;
