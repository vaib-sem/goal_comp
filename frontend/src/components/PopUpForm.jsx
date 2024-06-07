import React, { useEffect, useState } from 'react'

const PopupForm = ({ onClose,id }) => {
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (isSubmitting) {
            formData.goalId = id;
            axios.post('http://localhost:3000/api/v1/goal/updategoal', formData)
            .then((res) => {
                let text = res.data.message;
                if (text === 'Add a feild') {
                    alert('Add a feild');
                } else if (text === 'User does not exist ,Please signup') {
                    alert('User does not exist ,Please signup');
                } else if (text === 'Problem in updating goal') {
                    alert('Problem in updating goal');
                } else if (text === 'Goal updated successfully') {
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
          }).finally(() => setIsSubmitting(false));
            
            
        }       
},[isSubmitting])
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    }
    const HandleInput = ((event)=> {
        setFormData(prev => ({...prev,[event.target.name]:event.target.value}))
    })
    return(
        <div className="popup">
            <div className="popup-inner flex justify-center">
                <form onSubmit={handleSubmit}>
                    {/* Add your form fields here */}
                    <p className=' pb-1 text-sm text-center text-[#b6b7c4]'>GOAL NAME</p>
                    <input onChange={HandleInput} type="text" placeholder="Workout" name='GoalName' className='w-full h-[1.6rem] rounded-lg px-1 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'/>
                    <p className='pt-2 pb-1 text-sm text-center text-[#b6b7c4]'>GOAL DESCRIPTION</p>
                    <input onChange={HandleInput} type="email" placeholder="Workout every day 💪" name = 'GoalDescription' className='w-full h-[1.6rem] rounded-lg px-1 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'/>
                    <p className='pt-2 pb-1 text-sm text-center text-[#b6b7c4]'>GOAL END DATE</p>
                    <input onChange={HandleInput} type="date" name='End Date'  className='w-full h-[1.6rem] rounded-lg px-1 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'/>
                <button className=' w-full  rounded-xl h-[1.8rem] mt-5 bg-[#DBF4A7] hover:bg-[#C5DB96] text-center font-semibold text-lg text-[#4A4D6D] '>Submit</button>
                <button onClick={onClose} className='w-full rounded-2xl h-[1.8rem]  mt-2 text-center text-sm font-light bg-[#5c5e7b] hover:bg-[#424562] text-white'>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default PopupForm;