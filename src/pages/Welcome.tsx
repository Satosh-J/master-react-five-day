// import '../App.css'

import { useNavigate } from "react-router-dom";

export function WelcomePage() {
    const navigate = useNavigate()
    const handleLoginBtnCLick = () => {
        navigate('/users')
    }
    return (
        <>
            <h1>Welcome to Chara!</h1>
            <button className='btn btn-primary'
                onClick={handleLoginBtnCLick}
            >Log in</button>
        </>
    );
}