import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { setDarkMode, darkMode } = useContext(AppContext);
  return (
    <div
      className={`flex items-center justify-center h-screen w-full transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`relative text-center p-10 rounded-2xl shadow-2xl max-w-lg border transition-all ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-gray-300 text-gray-800"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <h1 className="text-5xl font-extrabold mb-6">🔮 VanishVote</h1>
        <p className="text-lg mb-6">
          Create anonymous polls that disappear after a set time. Stay unseen,
          stay anonymous.
        </p>

        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-md"
        >
          🚀 Create a Poll
        </button>
      </div>
    </div>
  );
};
export default Home;
