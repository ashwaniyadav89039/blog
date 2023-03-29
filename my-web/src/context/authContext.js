import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    currentUser: null,
    login: () => {},
    logout: () => {},
  });

 export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null);

    // console.log(localStorage.getItem("user",currentUser));


    const login = async (inputs) => {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
      
        if (res.status === 200) {
          const data = await res.json();
          setCurrentUser(data);
          localStorage.setItem("user", JSON.stringify(currentUser));
          //console.log(currentUser);
        } else {
          // Handle error case here
        }
      };
      

    const logout = async (inputs) => {
        const res = await fetch("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser || null));
        //console.log(currentUser);
    }, [currentUser]);
    

   

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

