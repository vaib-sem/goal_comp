import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import axios from "axios";

const Searchbar = ({setResults,inputdata,setInput,id}) => {
    
    const fetchData = async (value) => {
        axios.get('http://localhost:3000/api/v1/user/bulk', {params: {name: value}})
            .then(res => {
                const data = res.data.users;
                if (data) {
                    const results = data.map(user => ({
                        user: `${user.firstName} ${user.lastName}`,
                        id: user._id
                    }));
                    setResults(results);
                } 
                
            }).catch (error =>  {
                console.error('Error fetching data:', error);
            })
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        fetchData(e.target.value);
    }
    return(
        <div className="flex flex-col content-center justify-center">
        <div className="w-full flex flex-row  mt-1 justify-center bg-[#dedee4] rounded-lg h-[2rem] px-6 shadow-lg content-center">
            <div className="mt-2 mr-3">
                <FaSearch className="" id="search-icon" />
            </div>
            <input
                type="text"
                placeholder="Type to search..."
                onChange={handleChange}
                value = {inputdata}
                className="w-full h-full bg-transparent focus:outline-none text-sm font-sans"
            />
        </div>
        </div>
    )
}

export default Searchbar;