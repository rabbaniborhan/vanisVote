import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import CreatePoll from "./page/CreatePoll";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import PollPage from "./page/PollPage";

const App = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <div className="min-h-screen">
      <div
        className={`flex items-center justify-center w-full transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/poll/:id" element={<PollPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
