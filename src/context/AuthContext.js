import {createContext, useReducer, useEffect} from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    notifications: [],
    friends: [],
    suggestions: null,
};

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    useEffect(() => {
        if(state?.user){
            localStorage.setItem("logged", true); 
        }else{
            localStorage.setItem("logged", false);
        }
    }, [state?.user])
    
    return(
        <AuthContext.Provider 
            value={{
                user:state.user,
                isFetching: state.isFetching,
                error: state.error,
                notifications: state.notifications,
                friends: state.friends,
                suggestions: state.suggestions,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

