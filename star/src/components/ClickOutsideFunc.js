import {useRef, useEffect} from 'react'

export const ClickOutsideFunc = (handler) => {
    let domComp = useRef()

    useEffect(()=> {
        let opHandler = (event) => {
            if(!domComp.current.contains(event.target)) {
                handler()
            }
        }
        
        document.addEventListener("mousedown", opHandler);

        return () => {
            document.removeEventListener("mousedown", opHandler);
        }
    })
  return domComp
}