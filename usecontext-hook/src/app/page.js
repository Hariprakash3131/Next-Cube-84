
'use client'
import UserContext from "./context/UserContext";
import UserProfile from "./portfolio/UserProfile";
export default function Home() {
  const userName="Surya"
  return (
    <div>
            <UserContext.Provider value={userName}>

                <UserProfile />

            </UserContext.Provider>

        </div>
  
  )        
  ;
}
