import React,{ useState }from "react";
import style from "./card.module.css";

const Card = ({uuidkey,brew,sysurl,deckName,userName,imgID,name,rarity,keyruneCode,cardType,otherSide,price,key}) =>{
    const imgUrl = "https://api.scryfall.com/cards/"+ imgID +"?format=image";
    const [imageState, setImageState] = useState(imgUrl);
    var imgUrlOtherSide = null;
    var CURR_PRICE = 0;
    var ammount = 0;
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
    const Addcard = async () => {
        ammount = ammount++;
        const responce = await fetch(BREWADDURL);
    }
    if (brew.length !== 0){
        ammount = brew[0].ammount;
    }
    if (price === undefined || price === null){
        CURR_PRICE = 0;
    }else{
        CURR_PRICE = price;
    }
    var UUIDKey = "";
    if (uuidkey === undefined){
        UUIDKey = ""
    }else{
        UUIDKey = uuidkey;
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
    if (keyruneCode === null || keyruneCode === undefined){
        SETCODE = "DEFAULT";
    }else{
        SETCODE = keyruneCode.toLowerCase();
    }
    var DECKNAME = "";
    if (deckName === null){
        DECKNAME = deckName;
    }else{
        DECKNAME = "Collection";
    }
    var USERNAME = "";
    if (userName === null){
        USERNAME = "Cody902105";
    }else{
        USERNAME = userName;
    }
    var QUERY = "?deckName="+DECKNAME+"&uuid="+UUIDKey+"&userName="+USERNAME;
    var BREWADDURL = sysurl+"/brew/add"+QUERY;
    const setIcon = "ss ss-" + SETCODE + " ss-"+ RARITY +" ss-grad ss-2x ss-fw";
    const typeIcon = "ms ms-" + CARDTYPE + " ms-2x ms-fw";
    return(
        <div>
            <img src={imageState} alt="" className={style.picture} onClick={changeImage}/>
            <div className={style.bar}>
                <i className={typeIcon}></i> 
                <span>{"€ " + CURR_PRICE}</span>
                <button onClick={Addcard}>{ammount}</button>
                <i className={setIcon}></i>
            </div>
        </div>
    );
}

export default Card;