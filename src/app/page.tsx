'use client'
import {  useEffect, useState } from "react";
import { serverUrl } from "./constants";
import PlayerRankInfo from "./PlayerRankInfo";
export default function Home() {

  const [foundPlayers, setFoundPlayers] = useState([])
  const [isFoundPlayersLoading, setIsFoundPlayersLoading] = useState<boolean>(false)

  const [cannotFoundName,setCannotFoundName] = useState<string>("")
  const [searchedPlayer, setSearchedPlayer] = useState<string>("")

  useEffect(()=>{
    getRank(null)
  },[])

    async function  getRank(e: any){
    if (isFoundPlayersLoading) {
      return
    }
    setIsFoundPlayersLoading(true)
    let response = await fetch(serverUrl + "/leaderBoard/latest/list",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchedPlayer }),
      }
    )
    if (!response.ok) {
      setIsFoundPlayersLoading(false)
      
      console.log("error")
      return
      
    }
    const data = await response.json();
    setIsFoundPlayersLoading(false)
    setCannotFoundName(searchedPlayer)
    setFoundPlayers(data)

  }

  return (
    <div className="flex flex-col items-center my-2 text-3xl font-bold">
      <h2 className="text-white my-2">Leaderboard</h2>
      <div className="flex  w-3/4">
        <input placeholder="Search"
          className=" w-3/4 bg-color-input text-white text-xl my-2 py-2 px-2 placeholder-white outline-none focus:border-purple-500 border-purple-500 border rounded"
          onChange={(e) => {
            
            setSearchedPlayer(e.target.value)
          }}
        />
        <button className="flex-1 text-white text-lg border-purple-500 border rounded m-2 p-2 "
          onClick={getRank}
        >Get Rank</button>
      </div>
      <div className="text-white text-lg">You can search in this format Player(number)</div>
      <div className="text-white text-lg">number can be 10000</div>

      <div style={{ backgroundColor: "#1C172B" }} className="flex flex-1 w-3/4 p-2">
        <div style={{ flex: 2, color: "#74737B" }} className="text-lg">
          Ranking
        </div  >
        <div style={{ flex: 4, color: "#74737B" }} className=" text-lg ">

          Player Name

        </div>
        <div style={{ flex: 3, color: "#74737B" }} className=" text-lg ">
          Country
        </div>
        <div style={{ flex: 2, color: "#74737B" }} className=" text-lg ">
          Money
        </div>
      </div>
      {
        (isFoundPlayersLoading) ?
          <div className="text-white text-xl m-4">Loading</div>
          : (foundPlayers.length === 0 && cannotFoundName !== "")

            ? 
            <div className="text-white text-xl m-4"> No players found with {cannotFoundName}</div>
            :
            foundPlayers.map((foundPlayer: any, index) => {
              return (<PlayerRankInfo key={"playerRankInfo" + index} playerRank={foundPlayer["rank"]} playerName={foundPlayer["Player.name"]}
                playerCountry={foundPlayer["Player.country"]} playerMoney={foundPlayer["money"]}
                isSelected={foundPlayer["Player.name"] === searchedPlayer}
              />)

            })
      }

    </div>
  );
}
