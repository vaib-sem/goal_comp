import { useEffect } from "react";
import PropTypes from 'prop-types';
import HoverRenew from "./hoverRenew";
import axios from "axios";
import GoalWithId from "./recoil";
import {
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
//define state and update the element on the basis of the chage in props
//props would be 
const GoalCard = (id) => {
    const [goalState,setgoalState] = useRecoilState(GoalWithId(id));
    const {goalName ,
        goalDescription ,
        goalStart ,
        goalEnd ,
        datecompleted,
        friends_id } = goalState
        console.log('start')
    useEffect(() =>{
       axios.get('http://localhost:3000/api/v1/goal/bulk', {params: {id}})
       .then(res => {
        const { goalName, goalDescription, goalStart, goalEnd, datecompleted, friends_id } = res.data;
        setgoalState({
            goalName,
            goalDescription,
            goalStart,
            goalEnd,
            datecompleted,
            friends_id
        });

        console.log(datecompleted)
        console.log('a')
       }).catch(error => {
        console.error("There was an error fetching the goal data!", error);
      });
    },[id])
   


    const Datemissed = (goalStart) => {
        const date1 = new Date(goalStart);
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        console.log(date1);
        console.log(currentDate);
        let differnece  = currentDate.getTime() - date1.getTime();
        let Difference_In_Days =
        Math.round(differnece/ (1000 * 3600 * 24));
        return isNaN(Difference_In_Days) ? 0 : Difference_In_Days;
        }

    const DateConvertor = (date_format) => {
        let date1 = new Date(date_format);
        let date = date1.getDate();
        const month = date1.getMonth() +1         
        let year = date1.getFullYear();
        return date + '/' + month + '/' + year ;
    }

    if (!goalName || !goalDescription || !goalStart || !goalEnd) {
        return <p>Loading...</p>;
    }

    return( 
    
            <div className="w-1/2 max-w-lg">
                <div className=" h-full bg-[#774C60] rounded-2xl drop-shadow-2xl">
                    <div className="flex mt-4  justify-between ">
                        <div className="pt-5 px-6 flex ">
                            <p className="pt-2 pl-4 text-center font-bold text-2xl text-[#B78FA2]">{goalName}</p>
                        </div>
                        <div className="pt-3 mt-4 px-6 flex-none ">
                            <div className="h-10 w-10 rounded-lg border-4 border-[#B78FA2] border-solid ">
                                <HoverRenew id = {{id}}></HoverRenew>
                            </div>
                        </div>
                    </div>
                    <div className="px-10 ">
                        <p className="text-left font-medium text-base text-[#ccb0bd]">{goalDescription}</p>
                    </div> 
                    <div className="mt-6 flex justify-around">
                        <div className="bg-[#426B69] rounded-lg p-1 flex-1 mx-6 drop-shadow-lg">
                            <p className=" text-xs pb-1 min-h-4 text-center font-light text-[#E4ECD5]">{DateConvertor(goalStart)} - {DateConvertor(goalEnd)}</p>
                            <p className=" text-sm text-center font-semibold text-[#bfdbf7]">GOAL DATES</p>
                        </div>
                        <div className="bg-[#426B69] rounded-lg p-1 flex-1 drop-shadow-lg">
                            <p className=" text-xs pb-1 min-h-4 text-center font-light text-[#E4ECD5]">{datecompleted}</p>
                            <p className=" text-sm text-center font-semibold text-[#bfdbf7]">COMPLETED </p>
                        </div>
                        <div className="bg-[#426B69] rounded-lg p-1 flex-1  mx-6 drop-shadow-lg">
                            <p className=" text-xs pb-1 min-h-4 text-center font-light text-[#E4ECD5]">{String(Datemissed(goalStart))}</p>
                            <p className=" text-sm text-center font-semibold text-[#bfdbf7]">MISSED </p>
                        </div> 
    
                    </div>
                    <div className="px-8 pt-1 ">
                    </div>
                </div>
                
            </div>
    )
}
GoalCard.propTypes = {
    id: PropTypes.string.isRequired,
};
export default GoalCard