import React,{useState,useEffect} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { tick } from "../description";

const HoverRenew = () => {
    const [isHovering,setisHovering] = useState(false);
    const [isClicked,setisClicked] = useState(false);
    const [showConfetti,setshowConfetti] = useState(false);
    const [isClickable,setisClickable] = useState(true);

    useEffect(() => {
        const lastClickedDate = localStorage.getItem('lastClickedDate');
        const today = new Date().toDateString();
        if (lastClickedDate !== today){
            localStorage.setItem('lastClickedDate',today);
            setisClickable(true);
            console.log(lastClickedDate)
        }else{
            setisClickable(false);
        }
    }, []);

    const handleClick =() => {
        setisClicked(true);
        setshowConfetti(true);
        const now = new Date();
        localStorage.setItem('lastClickedDate', now.toDateString()); //stores the date the button was clicked
        setisClickable(false)
        //add the funtionality to inc the datecompleted in the card
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const lastClickedDate = localStorage.getItem('lastClickedDate');
            const today  = new Date().toDateString();

            if(lastClickedDate !== today){
                localStorage.setItem('lastClickedDate', today);
                setisClickable(true);
            }
            console.log('check')
        },60000);
        return() => clearInterval(intervalId);

    },[])

    const handleMouseenter = () => {
        setisHovering(true);
    }

    const handleMouseleave= () => {
        setisHovering(false);
    }

    

    const confetticomplete =() => {
        setshowConfetti(false);
    }

    return(
        <div onMouseEnter={handleMouseenter} onMouseLeave={handleMouseleave} onClick={isClickable ? handleClick : null} >
            {(isHovering || !isClickable) ? (
                <button>
                    <img src={tick} className="w-8"></img>
                </button>
            ):<span><div>.</div></span>}{(isClicked && showConfetti) && (
                <ConfettiExplosion force={0.4} duration={3000} particleCount={100} width={1000} onComplete={confetticomplete}/>
            )}
        
        </div>
    )
}

export default HoverRenew;