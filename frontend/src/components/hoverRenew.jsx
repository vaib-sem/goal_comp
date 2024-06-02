import React,{useState,useEffect} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { tick } from "../description";
import GoalWithId from "./recoil";
import {useRecoilState } from 'recoil';
import axios from "axios";
import PropTypes from 'prop-types';

const HoverRenew = ({id}) => {
    const [isHovering,setisHovering] = useState(false);
    const [isClicked,setisClicked] = useState(false);
    const [showConfetti,setshowConfetti] = useState(false);
    const [goalList,setgoalList] = useRecoilState(GoalWithId((id))); 
    const [isClickable,setisClickable] = useState(false);

    useEffect(() => {
        const lastClickedDate = localStorage.getItem('lastClickedDate');
        const today = new Date().toDateString();
        if (lastClickedDate != today){
            setisClickable(true);
        }if (lastClickedDate == today) {
            setisClickable(false);
        } 
    }, []);

    const handleClick =() => {
        axios.post('http://localhost:3000/api/v1/goal/complete-goal',
            {   goalId : id,
                marked_unmarked : 1,})
            .then(res => {
                let text = res.data.message;
                if(text == 'Goal not found'|| text == "Problem in marking complete task"){
                    alert("Unable to update the Goal")
                }else{
                    //implies that if the post request is successfull only then will the tick appear
                    setisClicked(true);
                    setshowConfetti(true);
                    const now = new Date();
                    localStorage.setItem('lastClickedDate', now.toDateString()); //stores the date the button was clicked
                    setisClickable(false)
                
                    setgoalList(prev => ({
                        ...prev,
                        dateCompleted : prev.dateCompleted + 1 }))
                }

            })
            
      
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const lastClickedDate = localStorage.getItem('lastClickedDate');
            const today  = new Date().toDateString();

            if(lastClickedDate != today){
                setisClickable(true);
            }
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

HoverRenew.propTypes = {
    id: PropTypes.string.isRequired,
};

export default HoverRenew;