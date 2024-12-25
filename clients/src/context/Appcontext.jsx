// import 'react'
// import { createContext, useState } from 'react'

// export const Appcontext = createContext()


// export const AppContextProvider = ()=>{

//     const backendUrl = import.meta.env.VITE_BACKEND_URL
// const [isLoggedin, setIsLoggedin] = useState('false')
// const [userData,setUserData]=useState('false')


// const value = {
// backendUrl,
// isLoggedin, setIsLoggedin,
// userData,setUserData
// }

//     return (
//         // eslint-disable-next-line no-undef
//         <Appcontext.Provider value={props}>
// {this.props.children}
//         </Appcontext.Provider>
//     )
// }

import  { createContext, useState } from 'react';

export const AppContext = createContext();  // Make sure the name matches

export const AppContextProvider = (props) => {

    console.log(import.meta.env)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log( 'Backend Url : ',backendUrl)

    const [isLoggedin, setIsLoggedin] = useState(false); // Use boolean false instead of 'false' string
    const [userData, setUserData] = useState(null); // Use null as the initial value for userData

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
