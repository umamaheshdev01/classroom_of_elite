import React from "react";
const Board = ({ users }) => {

    const sortedUsers = users.sort((a, b) => b.score - a.score);
  
    return (
      <div className="bg-black min-h-screen w-4/5 mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center ">Leaderboard</h1>
        <hr className="border-white pb-3 w-3/4 mx-auto"></hr>
        <div className="flex flex-col px-10">
          {sortedUsers.map((user, index) => (
            <div key={index} className="p-2 border-white border-2  shadow shadow-white-500/40 hover:shadow-white-500/40 flex flex-row
            justify-around m-3 rounded-xl">
                <span className="font-bold text-3xl"> {index+1} </span>
            <span> <img src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1709813753~exp=1709814353~hmac=c5d99d40c3b3771cdc17791208cbb8dc434fd828ba63f77df4d6314cc231a5a7' className="border-black rounded-full w-[60px]"></img></span>
             <span> <h3 className="text-2xl mb-2">{user.name}</h3></span> 
             <span> <p className="text-white-600 font-semibold">XP: {user.score}</p></span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Board;