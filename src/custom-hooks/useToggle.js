import React, { useState } from 'react'

export const useToggle = (initialVal=false) => {
    const [state,setState] = useState(initialVal);

    const toggle= () =>{
        setState((prev)=>!prev)
    }
    return [state,toggle]
}


// where to use it 
// import usetoggle function
// const [isVisible,toggle] = useToggle()
// const [isVisible1,toggle2] = useToggle()
// const [isVisible3,toggle3] = useToggle();;;;;; use it in your page
// The onClick will now have onClick={toggle}
// You can now write thelogic to display or not to
// e.g {isVisible ? "Hide" : "Show"}



