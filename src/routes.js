import { Fragment  } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Chatgpt from './pages/Chatgpt';
import useAuth from "./hooks/useAuth";


const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />;
};



const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path='/' element={<Login />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/cadastro' element={<Cadastro />}/>
                    <Route path='/chatgpt' element={<Chatgpt />}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default AppRoutes;