import { Link } from "react-router-dom"
import { work } from "../description" 
import { HoverSVG } from "../components"

const Login = () =>{
    return(
        <div className=" w-1/2 bg-[#DBF4A7] hover:bg-[#C5DB96] flex justify-center rounded-lg">
            <Link to='/singup' className="text-center justify-items-center">
                <p className="p-4 text-center font-semibold text-lg text-[#4A4D6D]">TURN GOALS TO VICTORIES</p>
            </Link>
        </div>
       
    )
}
const Signup = () => {
    return (
        <div className=" w-1/2 bg-[#4A4D6D] hover:bg-[#424562] flex justify-center rounded-lg">
            <Link to='/signin' className="text-center justify-items-center" >
                <p  className="p-4 text-center font-normal text-lg text-[#bfdbf7]">I HAVE AN ACCOUNT </p>
            </Link>
        </div>
    )
}
const Table =() => {
    return (
        <table className="table-fixed drop-shadow-md border-collapse mt-10">
    <thead>
        <tr className="border-2 mt-12 border-double rounded-2xl border-[#372549]">
  <th className="px-7 text-lg text-bold text-[#B78FA2] text-bold">Sno.       </th>
  <th className="px-7 text-lg text-[#B78FA2]">Username   </th>
  <th className="px-4 text-lg text-[#B78FA2]">Dates Completed</th>
</tr>
</thead>
<tbody>
<tr className="text-center border-2 border-double border-[#372549] pt-1 ">
  <td className="text-[#ccb0bd]">1</td>
  <td className="text-[#ccb0bd]">ramp_run</td>
  <td className="text-[#ccb0bd]">28</td>
</tr>
<tr className="text-center border-2 border-double pt-1 border-[#372549]">
  <td className="text-[#ccb0bd]">2</td>
  <td className="text-[#ccb0bd]">The_Eagles</td>
  <td className="text-[#ccb0bd]">26</td>
</tr>
<tr className="text-center border-2 border-double pt-1 border-[#372549]">
  <td className="text-[#ccb0bd]">3</td>
  <td className="text-[#ccb0bd]">1972_fighter</td>
  <td className="text-[#ccb0bd]">22</td>
</tr>
</tbody>
</table>
    )
    
}


const Landing = () => {
    

   return( 
    <div className="pt-24 max-w-6xl flex mx-auto">
        <div className="w-2/3">
            <div className="font-bold text-7xl text-[#DBF4A7]">
                SET GOALS
            </div>
            <div className=" font-bold text-7xl text-[#bfdbf7]">
                TO SUCCEED
            </div>
            <p className="pt-6 pb-12 text-inter text-lg font-medium text-[#f7fded]">
                Compete, Conquer, Collaborate: Turn Goals into Victories with <br></br>Friends to make them fun, easy, and automatic. !
            </p>
            <Login></Login>
            <div className="p-1"></div>
            <Signup></Signup>
        </div>
        <div className="w-1/2 ">
            <div className=" h-full bg-[#774C60] rounded-2xl drop-shadow-2xl">
                <div className="flex mt-4  justify-between ">
                    <div className="pt-5 px-6 flex ">
                        <p className="pt-4 pl-4 pr-3 text-center font-bold text-2xl text-[#B78FA2]">WORKOUT</p>
                        <img src={work} alt="workout" className="pt-1 w-10 object-contain flex-none"></img>
                    </div>
                    <div className="pt-8 mt-4 px-6 flex-none ">
                        <div className="h-10 w-10 rounded-lg border-4 border-[#B78FA2] border-solid ">
                            <HoverSVG></HoverSVG>
                        </div>
                    </div>
                </div>
                <div className="px-10 ">
                    <p className="text-left font-medium text-base text-[#ccb0bd]">Go To the gym everyday for two hours</p>
                </div>
                <div className="pt-2 mt-6 flex justify-around">
                    <div className="bg-[#426B69] rounded-lg p-1 flex-1 mx-6 drop-shadow-lg">
                        <p className=" text-xs text-center font-light text-[#E4ECD5]">14/05/14 - 24/07/24</p>
                        <p className=" text-sm text-center font-semibold text-[#bfdbf7]">GOAL DATES</p>
                    </div>
                    <div className="bg-[#426B69] rounded-lg p-1 flex-1 drop-shadow-lg">
                        <p className=" text-xs text-center font-light text-[#E4ECD5]">22</p>
                        <p className=" text-sm text-center font-semibold text-[#bfdbf7]">COMPLETED</p>
                    </div>
                    <div className="bg-[#426B69] rounded-lg p-1 flex-1  mx-6 drop-shadow-lg">
                        <p className=" text-xs text-center font-light text-[#E4ECD5]">08</p>
                        <p className=" text-sm text-center font-semibold text-[#bfdbf7]">MISSED</p>
                    </div>

                </div>
                <div className="px-8 pt-1 ">
                    <Table></Table>
                </div>
            </div>
            
        </div>
    </div>)
}

export default Landing