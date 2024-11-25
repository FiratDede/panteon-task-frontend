'use client'

import { useState } from "react";
import { serverUrl } from "./constants/urlConstants";

export default function Home() {

  const [foundPlayers, setFoundPlayers] = useState([])

  console.log("foundplayers:")
  console.log(foundPlayers)

  const [searchedPlayer, setSearchedPlayer] = useState<string>("")




  return (
    <div className="flex flex-col items-center my-2 text-3xl font-bold">
      <h2 className="text-white my-2">Leaderboard</h2>
      <div className="flex  w-3/4">
      <input placeholder="Search"  
      className=" w-3/4 bg-color-input text-white text-xl my-2 py-2 px-2 placeholder-white outline-none focus:border-purple-500 border-purple-500 border rounded" 
      onChange={(e)=>setSearchedPlayer(e.target.value)}
      />
      <button className="flex-1 text-white text-lg border-purple-500 border rounded m-2 p-2 "
      onClick={async (e)=>{
      let response = await  fetch(serverUrl+"/leaderBoard/latest/list",
          {method: "POST",
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({name: searchedPlayer}), 
          }
        )
        if (!response.ok) {
          console.log("error")
          return
        }
     
  
        const data = await response.json();

        setFoundPlayers(data)

      }}
      >Send</button>
      </div>
      <div  style={{backgroundColor: "#1C172B"}} className="flex flex-1 w-3/4 p-2">
        <div style={{flex: 2, color: "#74737B"}} className="text-lg">
        Ranking
        </div  >
        <div style={{flex: 4, color: "#74737B"}} className=" text-lg ">
        
          Player Name

        </div>
        <div style={{flex: 3, color: "#74737B"}} className=" text-lg ">
          Country
        </div>
        <div style={{flex: 2, color: "#74737B"}} className=" text-lg ">
          Money
        </div>
      </div>

      {
      foundPlayers.map((foundPlayer: any)=>{

        return(
          <div  style={{}} className="bg-color-input flex flex-1  w-3/4 p-2 my-2 border-purple-500 border rounded ">
        <div style={{flex: 2,}} className="text-lg text-white">
        {foundPlayer["rank"]}
        </div  >
        <div style={{flex: 4, }} className=" text-lg text-white">
        
        {foundPlayer["Player.name"]}

        </div>
        <div style={{flex: 3, }} className=" text-lg text-white">
        {foundPlayer["Player.country"]}

        </div>
        <div style={{flex: 2, }} className=" text-lg text-white">
        {foundPlayer["money"]}

        </div>
      </div>
        )
      })
      
       }

    </div>





  );
}
