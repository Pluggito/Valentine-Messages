import BunnyBackground from "./BunnyBackground"
import CountdownTimer from "./CountdownTimer"
import IosMessage from "./IosMessage"
import Menu from "./Menu"
import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const App = () => {
    const [countdownFinished, setCountdownFinished] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (countdownFinished) {
        navigate("/"); // Redirects after countdown
      }
    }, [countdownFinished, navigate]);
  
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Bunny Background */}
        <BunnyBackground />
  
        {/* Main Content */}
       {!countdownFinished ? (
          <CountdownTimer onComplete={() => setCountdownFinished(true)} />
        ) : (
          <main className="relative z-10 flex justify-center items-center min-h-screen">
            <Routes>
              <Route path="/" element={<IosMessage/> }/>
              <Route path="/next-page" element={<Menu/>}/>
            </Routes>
          </main>
        )}
        {/* return(
        <>
        <div>
       <Routes>
        <Route path="/" element={<IOSHello/> }/>
        <Route path="/next-page" element={<Menu/>}/>
        <Route path='/countdown' element={<CountdownTimer />} />
       </Routes>

        </div>
               
            
        </>
        
       ) */}
      </div>
      
    )      
  }
  
  export default App;
