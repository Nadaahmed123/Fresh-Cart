import { createContext, useState } from "react";

export let counterContext=createContext(0);
function CounterContextProvider(props){
    const [counter1,setCounter1]=useState(0);
    const [counter2,setCounter2]=useState(10);
    return(
     <counterContext.Provider value={{counter1,counter2}}>
      {props.children}
    </counterContext.Provider>
    );
}