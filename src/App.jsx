import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cheer from "./pages/Cheer";
import FinalCapture from "./pages/FinalCapture";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/cheers" element={<Cheer />}></Route>
      <Route path="/final" element={<FinalCapture />}></Route>
    </Routes>
  );
}
