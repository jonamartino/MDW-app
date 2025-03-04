import { useNavigate } from "react-router-dom";
import "../../App.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="">MDW App</h1>
            <button onClick={() => navigate('/') }></button>
            <button onClick={() => navigate('/about') }>Go to About</button>
        </div>
    )
};
export default Home;
