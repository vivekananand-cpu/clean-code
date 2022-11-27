import React from 'react'
import { isAuthenticated } from '../helper/auth';
import { addCompletedQuetion, deleteCompletedQuetion } from '../helper/coreApiCalls'


const Quetion = ({ quetion, solved ,reload , setReload}) => {

    const { user, token } = isAuthenticated();

    const setDifficulty = (difficultyId) => {
        if (difficultyId === '6356152e9184e98272f9906e') {
            return "Easy";
        }
        else if (difficultyId === '635615679184e98272f99071') {
            return "Medium";
        }
        else {
            return "Hard";
        }
    }

    const setDcss = (difficulty) => {
        if (difficulty === "Easy") {
            return "text-green-500 font-bold w-[100px] h-[50px] text-center p-3 rounded-full border-[1px]"
        }
        else if (difficulty === "Medium") {
            return "text-yellow-500 font-bold w-[100px] text-center h-[50px] p-3 rounded-full border-[1px]"
        }
        else {
            return "text-red-500 font-bold w-[100px] text-center h-[50px] p-3 rounded-full border-[1px]"
        }
    }


    return (
        <div className=' flex items-center justify-center'>
            <p className='pt-5 hover:shadow-md transition-all duration-300 ease-out  w-[80%] flex justify-between gap-3 border-[1px] m-5 items-center p-3 rounded-lg'>
                <div className='flex gap-5 items-center w-[45vw] justify-between' >
                    {
                        isAuthenticated() && !solved && (
                            <svg onClick={() => {
                                addCompletedQuetion(user._id, quetion._id, token)
                                    .then(data => {
                                        if (data.error) {
                                            alert(data.error)
                                        } else {
                                            alert('Marked Completed')
                                        }
                                    })
                            }} class="w-8 h-8 cursor-pointer text-violet-300 hover:text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        )
                    }
                    <a href={quetion.url} target='blank' className='font-bold text-xl hover:underline text-gray-500' >{quetion.title}</a>
                    <p className={`${setDcss(setDifficulty(quetion.difficulty))}`}>
                        <p>{setDifficulty(quetion.difficulty)}</p>
                    </p>
                </div>

               {
                isAuthenticated() && solved && (
                    <button
                        onClick={()=>{ 
                            deleteCompletedQuetion(user._id,quetion._id,token)
                            .then(data=>{
                                if(data.error){
                                    alert(data.error)
                                }else{
                                    alert("Problem deleted successfully");
                                    setReload(!reload);
                                }
                            })
                        }}
                     className="text-red-500 font-bold rounded-lg border p-3" >Delete</button>
                )
               }

            </p>
        </div>

    )
}

export default Quetion;