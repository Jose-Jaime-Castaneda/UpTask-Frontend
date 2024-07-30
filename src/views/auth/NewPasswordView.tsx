import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";

export default function NewPasswordView() {

    const [token, setToken] = useState<string>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>

            <h1 className="text-5xl font-black text-white">Nueva Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el token que recibiste y {''}
                <span className=" text-fuchsia-500 font-bold">genera una nueva contraseña</span>
            </p>

            {isValidToken ? <NewPasswordForm token={token}/> 
            : <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>}
        </>
    );
};