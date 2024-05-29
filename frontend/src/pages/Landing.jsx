import { Link } from "react-router-dom"
import { work } from "../description" 
import { HoverSVG } from "../components"




const Landing = () => {
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
        <div className="w-1/3 ">
            <div className=" h-2/3 bg-[#774C60] rounded-lg drop-shadow-2xl">
                <div className="flex justify-between ">
                    <div className="pt-5 px-6 flex ">
                        <p className="pt-4 pl-4 pr-3 text-center font-bold text-lg text-[#B78FA2]">WORKOUT</p>
                        <img src={work} alt="workout" className="pt-2 w-9 object-contain flex-none"></img>
                    </div>
                    <div className="pt-8 px-6 flex-none ">
                        <div className="h-8 w-8 rounded-lg border-4 border-[#B78FA2] border-solid ">
                            <HoverSVG></HoverSVG>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>)
}

export default Landing