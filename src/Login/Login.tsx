import { FormEvent, useContext, useRef, useState } from "react";
import { AuthenticationContext } from "../Contexts/AuthenticationContext";

export const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [expiration, setExpiration] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {login} = useContext(AuthenticationContext);

    const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (login){
            try{
                const expiry = await login({username: usernameRef.current!.value, password: passwordRef.current!.value});

                setExpiration(`You are logged in until ${expiry.toLocaleTimeString()}`);
                setErrorMessage('');
            }
            catch (ex: any)
            {
                setExpiration('');
                setErrorMessage(ex.message ?? 'Unknown error.')
            }
        }
    };

    return (
        <>
            <fieldset disabled={expiration !== ''}>
                <form onSubmit={e => submit(e)}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" ref={usernameRef} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" ref={passwordRef} required />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </fieldset>
            <p> { expiration }</p>      
            <p className="error">{ errorMessage }</p>
        </>
    );
}