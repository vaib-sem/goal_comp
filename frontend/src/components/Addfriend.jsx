
import { useState } from 'react';
import Searchbar from './Searchbar';
import SearchResultsList from './SearchResultsList';
import GoalWithId from './recoil';
import { useRecoilState } from 'recoil';
import axios from 'axios';


const Addfriend = ({onClose, id }) => {
    const [goalState,setgoalState] = useRecoilState(GoalWithId(id));
    const [result, setResult] = useState(null);
    const [input, setInput] = useState('');
    const [ids,setid] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if(ids === ''){
            return;
        }
        const token = localStorage.getItem('token');
        const Data = {
            user_friendId : ids,
            goalId : id.id
        }
        console.log(Data);
        axios.post('http://localhost:3000/api/v1/goal/Addfriend', Data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }})
            .then((res) => {
                let text = res.data.message;
                if (text ===  "Unable to add a friend ") {
                    alert( "Unable to add a friend ");
                } else if (text === "Friend not found") {
                    alert("Friend not found");
                } else if (text === "Goal not found") {
                    alert("Goal not found");
                } else if (text === "friend added successfully") {
                    const updatedGoalState = {
                        ...goalState,
                        friends_id: [...goalState.friends_id, ids],
                        datecompleted: [...goalState.datecompleted, { id: ids, completed_days: 0 }]
                    };
                    setgoalState(updatedGoalState);
                    onClose();
                }
            
            }).catch((err) => {
              console.error('Error during API call:', err.response ? err.response.data : err.message);
              if (err.response) {
                  // Server responded with a status other than 200 range
                  alert(`Error: ${err.response.data.message}`);
              } else if (err.request) {
                  // Request was made but no response received
                  alert('Error: No response from server.');
              } else {
                  // Something happened in setting up the request that triggered an Error
                  alert(`Error: ${err.message}`);
              }
          })


    }


    return (
        <div className='flex flex-col items-center'>
            <Searchbar setResults={setResult} inputdata = {input} setInput = {setInput}  id ={id}/>
            <div className=' mt-2 ml-12 mr-12 w-3/4'>
                {result ? <SearchResultsList results={result} setInput={setInput} setid = {setid} /> : null}
            </div>
            <div className='flex flex-row'>
            <button className=' w-[8rem]  rounded-xl h-[1.8rem] mt-3 mr-2 bg-[#DBF4A7] hover:bg-[#C5DB96] text-center font-semibold text-sm text-[#4A4D6D] ' onClick={onSubmit}>Add Friend</button>
            <button className='w-[8rem] rounded-xl h-[1.8rem]  mt-3 text-center text-sm font-light bg-[#5c5e7b] hover:bg-[#424562] text-white' onClick ={onClose}>close</button>
            </div>
            
            
        </div>
    )
}

export default Addfriend;