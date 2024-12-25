import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; // Ensure axios is imported

export const AppContext = createContext();  // Context name matches

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    console.log(import.meta.env);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log('Backend Url : ', backendUrl);

    const [isLoggedin, setIsLoggedin] = useState(false); // Use boolean false instead of 'false' string
    const [userData, setUserData] = useState(null); // Use null as the initial value for userData
    const [loading, setLoading] = useState(false); // For handling loading state
    const [error, setError] = useState(null); // To track any potential errors

    const getUserData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    }


    const getAuthState = async ()=>{
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.Message); 
        }
    }

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        loading,  // Include loading state to handle async operations
        error,    // Optional: could be useful for error boundary or notifications
        getUserData
    };


    useEffect(()=>{
        getAuthState()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
