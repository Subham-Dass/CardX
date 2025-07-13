import "./App.css";
import CardList from "./components/CardList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div
        id="wrapper"
        className="bg-gradient-to-r from-white via-indigo-50 to-cyan-50 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 py-8 min-h-screen transition-colors duration-300"
      >
      <Toaster position="top-right"/>
      
        <div id="content" className="">
          <div className="text-center mt-12 mb-8 px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Products Catalog
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-gray-600">
              Choose from our wide range of products
            </p>
          </div>

          <CardList />
        </div>
      </div>
    </>
  );
}

export default App;
