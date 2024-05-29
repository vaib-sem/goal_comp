import React,{useState} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { tick } from "../description";
import ReactConfetti from "react-confetti";

const HoverSVG = () => {
    const [isHovering,setisHovering] = useState(false);
    const [isClicked,setisClicked] = useState(false);
    const [showConfetti,setshowConfetti] = useState(false);

    const handleMouseenter = () => {
        setisHovering(true);
    }
    const handleMouseleave= () => {
        setisHovering(false);
    }
    const handleClick =() => {
        setisClicked(true);
        setshowConfetti(true);
    }
    const confetticomplete =() => {
        setshowConfetti(false);
    }

    return(
        <div onMouseEnter={handleMouseenter} onMouseLeave={handleMouseleave} onClick={handleClick} >
            {(isHovering || isClicked) ? (
                <button>
                    <img src={tick} className="w-8"></img>
                </button>
            ):<span><div>.</div></span>}{(isClicked && showConfetti) && (
                <ConfettiExplosion force={0.4} duration={3000} particleCount={100} width={1000} onComplete={confetticomplete}/>
            )}
        
        </div>
    )
}

export default HoverSVG;