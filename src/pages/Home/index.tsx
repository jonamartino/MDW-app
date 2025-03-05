import { useNavigate } from "react-router-dom";
import "../../App.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2">
            <h3>MDW App</h3>
            <button onClick={() => navigate('/about') }>Go to About</button>
            <button onClick={ () => navigate('/signup') }>Go to Sign Up</button>
            <button onClick={ () => navigate('/login') }>Go to Log In</button>
            <button onClick={ () => navigate('/organizations') }>Go to Organization</button>
        </div>
    )
};
export default Home;
