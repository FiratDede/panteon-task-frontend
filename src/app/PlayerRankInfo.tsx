type PlayerRankInfoProps = {
    playerRank: number;  
    playerName: string; 
    playerCountry: string;
    playerMoney: number;
    isSelected: boolean;
  };

const PlayerRankInfo: React.FC<PlayerRankInfoProps> = ({ playerRank,playerName,playerMoney,playerCountry, isSelected }) => {
  const selectedTextClass: string = "text-lg text-selected-rank-info-color"
  const nonSelectedTextClass: string = "text-lg text-white"
  return(   <div  style={{}} className="bg-color-input flex flex-1  w-3/4 p-2 my-2 border-purple-500 border rounded ">
    <div style={{flex: 2,}} className={(!isSelected) ? nonSelectedTextClass : selectedTextClass }>
    {playerRank}
    </div  >
    <div style={{flex: 4,  }} className={(!isSelected) ? nonSelectedTextClass : selectedTextClass }>
    {playerName}
    </div>
    <div style={{flex: 3, }} className={(!isSelected) ? nonSelectedTextClass : selectedTextClass }>
    {playerCountry}

    </div>
    <div style={{flex: 2, }} className={(!isSelected) ? nonSelectedTextClass : selectedTextClass }>
    {playerMoney}
    </div>
  </div>)
}

export default PlayerRankInfo