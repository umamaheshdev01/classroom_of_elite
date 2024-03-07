import React from "react";
const Board = ({ users }) => {

    const sortedUsers = users.sort((a, b) => b.score - a.score);
  
    return (
      <div className="bg-gray-200 min-h-screen w-1/2 mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Leaderboard</h1>
        <div className="flex flex-col">
          {sortedUsers.map((user, index) => (
            <div key={index} className="bg-white p-6 shadow-md flex flex-row
            justify-around m-3 rounded-xl">
                <span className="font-bold"> {index+1} </span>
            <span> <img src='C:\Users\kumar\OneDrive\Desktop\leaderboard2\leaderboard\src\components\GGSJ_poster.png' className="border-black rounded-full w-[30px]"></img></span>
             <span> <h3 className="text-2xl font-semibold mb-2">{user.name}</h3></span> 
             <span> <p className="text-gray-600">XP: {user.score}</p></span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Board;