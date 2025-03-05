import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleLogIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth , email, password);
            navigate('/');
            console.log(userCredential);
        } catch (error) {
            console.error(error)
        } 
    }

    console.log(email, password);
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="name">Email</label>
                    <input type="email" onChange={handleEmailChange}/>
                </div>
                <div>
                    <label htmlFor="email">Password</label>
                    <input type="password" onChange={handlePasswordChange} id="password" />
                </div>
                <button type="button" onClick={handleLogIn}>
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default SignUp;