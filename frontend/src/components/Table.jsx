import axios from "axios"
import { useEffect ,useState} from "react"
import PropTypes from 'prop-types';
//arr is of type [{id: string, completed_days: number}]


const Table = (friends) => {
const [sortedFriends, setSortedFriends] = useState([]);
const [names, setNames] = useState([]);
let data = friends.friends;
useEffect(() => {
    const sorted = data.sort((a, b) =>  {
        return b.completed_days - a.completed_days
    });
        setSortedFriends(sorted);
    const userIds = sorted.map(user => user.id);

    const fetchNames = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/user/names', userIds);
                if (response.data.status === 411) {
                    alert('Server issue loading friends');
                } else {
                    setNames(response.data.name);
                }
            } catch(err) {
                console.error("There was an error fetching the data!", err.response ? err.response.data : err.message);
            }
    }
    fetchNames();
},[friends])

const friendsWithNames = sortedFriends.map((friend, index) => ({
    ...friend,
    username: names[index] || ''
}));
console.log(friendsWithNames);


return (
    <div class="relative overflow-x-auto rounded-lg mb-2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400 ">
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
            {friendsWithNames.map((friendsWithNames,index) => (
                        <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700" key={friendsWithNames.id}>
                            <td className="px-6 py-4 text-center">{index+1}</td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{friendsWithNames.username.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())/* to change the first charecter of every word capital  */}</th>
                            <td className="px-6 py-4 text-center">{friendsWithNames.completed_days}</td>
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
            completed_days: PropTypes.number.isRequired,
        })
    ).isRequired,
};
export default Table