import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages";
import Search from "./pages/search";
import Homedescription from "./pages/homeDescription";
import Agsignup from "./pages/Agsignup";
import AgentLogin from "./pages/Aglogin";
import AddHome from "./pages/AddHome";
import AddHomeImages from "./pages/addHomeImages";
import Agent from "./pages/agent";


function App() {
  return (
    <BrowserRouter>
      <Routes>

      {/* this is for the landing page */}
        <Route path="/" element={<Landing/>}/>

        {/* this is for the search page */}
        <Route path="/search" element={<Search/>}/>

        {/* this is for the description page  for each of the product*/}
        <Route path = "/description/:id" element={<Homedescription/>}/>

        {/* this is for the sign up for the agent*/}
        <Route path="/agent/signup" element={<Agsignup/>}/>

        {/* this is for the log in for the agent */}
        <Route path="/agent/login" element={<AgentLogin/>}/>

        {/* register a home */}
        <Route path="/add/home" element={<AddHome/>}/>

        {/* add the images for the homes */}
        <Route path="/add/home/image" element={<AddHomeImages/>}/>

        {/* this is the agent infor page after login */}
        <Route path="/agent/:agent" element={<Agent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
