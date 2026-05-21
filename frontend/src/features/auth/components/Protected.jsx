import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Protected = ({children}) => {
  const {user,loading}=useAuth();
if(loading){   //loading state is true when we are fetching the user data from the server, so we can show a loading screen until we get the user data
    return(
        <main>
            <h1>Loading</h1>
        </main>
    )
}
if(!user){
   return <Navigate to={"/login"}/>
}
return children;
}

export default Protected