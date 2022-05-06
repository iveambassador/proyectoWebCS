import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import HomePage from "./Pages/HomePage";
import EmitirVoto from "./Pages/EmitirVoto";
import Navigation from "./Componets/Navigation";
import NotFoundPage from "./Pages/NotFoundPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EmitirVoto" element={<EmitirVoto />} />
        {/* <Route path="/users" element={<UserPage />} />
        <Route path="/test" element={<Navigate to="/"/>} />
        <Route path="/users/:id" element={<Parametros/>} /> */}
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;