import axios from "axios"
import { useEffect } from "react"


const Table = ({arr}) => {

const sorted = arr.sort((a,b) => {
    return b.completed_days - a.completed_days
})
const url = 'http://localhost:3000/api/v1/user/names';
const params = sorted.map(user => user.id) 
const names = []
useEffect(() => {
    axios.get(url,{params})
    .then(res => {
        const data = res.data;
        names = data;
        if(data.status == 411){
            alert('Server issue loading friends')
        }
    

    }).catch(error => {
        console.error("There was an error fetching the data!", error);
      });
},[])

const friends = sorted.map((data_id,index => ({
    ...data_id,
    username : names[index]
})))

return (
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        S.no
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Days Completed
                    </th>
                </tr>
            </thead>
            <tbody>
            {friends.map((friend,index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={friend.id}>
                            <td className="px-6 py-4 text-center">{index}</td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{friend.username}</th>
                            <td className="px-6 py-4 text-center">{friend.daysCompleted}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>

        )
    }
Table.propTypes = {
    friends: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            daysCompleted: PropTypes.number.isRequired,
        })
    ).isRequired,
};
export default Table