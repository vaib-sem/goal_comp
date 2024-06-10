import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ results = [],setInput,setid }) => {

    return (
        <div className=" content-center max-h-20 overflow-scroll rounded-b-lg shadow-lg bg-[#6c6e88] ml-2 mr-3 justify-center">
            {results.map((result) => {
            return <div className='max-h-20' key={result.id}><SearchResult  result={result.user} setInput={setInput} id={result.id} setid = {setid}  /></div>;
            })}  
            
        </div>
    )
}
export default SearchResultsList;