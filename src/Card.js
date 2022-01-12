import React,{ useState }from "react";
import style from "./card.module.css";

const Card = ({imgID,name,rarity,SetCode,cardType,otherSide,price}) =>{
    const BASE_URL = "http://localhost:8080/card/addOwned?uuid="+name+"&";
    const imgUrl = "https://api.scryfall.com/cards/"+ imgID +"?format=image";
    const [imageState, setImageState] = useState(imgUrl);
    var imgUrlOtherSide = null;
    var CURR_PRICE = 0;
    const changeImage = e => {
        if(otherSide !== undefined){
            if(imageState === imgUrl){
                if (imgUrlOtherSide === null){
                    imgUrlOtherSide = "https://api.scryfall.com/cards/"+ imgID +"?format=image&face=back";
                }
                setImageState(imgUrlOtherSide);
            }else{
                setImageState(imgUrl);
            }
        }
    }
    if (price === undefined){
        CURR_PRICE = 0;
    }else{
        CURR_PRICE = price;
    }
    var CARDTYPE = "";
    if (cardType === undefined){
        CARDTYPE = "plainswalker";
    }else{
        CARDTYPE = cardType[cardType.length-1].toLowerCase();
    }
    var RARITY = "";
    if (rarity === undefined){
        RARITY = "rare";
    }else{
        RARITY = rarity.toLowerCase();
    }
    if (RARITY === "special" ){
        RARITY = "timeshifted";
    }
    var SETCODE = "";
    if (SetCode === null || SetCode === "TSB"){
        SETCODE = "tsp";
    }else{
        SETCODE = SetCode.toLowerCase();
    }
    
    const setIcon = "ss ss-" + SETCODE + " ss-"+ RARITY +" ss-grad ss-2x ss-fw";
    const typeIcon = "ms ms-" + CARDTYPE + " ms-2x ms-fw";
    
    return(
        <div>
            <img src={imageState} alt="" className={style.picture} onClick={changeImage}/>
            <div className={style.bar}>
                <i className={typeIcon}></i> 
                <span>{"£ " + CURR_PRICE}</span>
                <i className={setIcon}></i>
            </div>
        </div>
    );
}

export default Card;