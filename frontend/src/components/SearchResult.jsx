import React from 'react'

 const SearchResult = ({ result, setInput,id,setid }) => {
    const handleClick = () => {
      setInput(result);

      setid(id);
      console.log(id)
    }
  return (
    <div
      className="py-1 pl-3 text-sm font-sans text-gray-800 cursor-pointer hover:bg-gray-200"
      onClick={handleClick}
    >

      {result}
    </div>
  )
}

export default SearchResult