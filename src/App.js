import React,{ useEffect, useState }  from 'react';
import "./App.css";
import Card from "./Card";
import "./css/keyrune.css";
import "./css/mana.css";

const App = () => {
  const BASE_URL = "http://localhost:8080";
  //system States
  const [updateState,setUpdateState] = useState(false);//if there is an avalable update to the system
  //States that affect results
  const [cards, setCards] = useState([]);//the list of all cards
  const [count, setCount] = useState(0);//an int with the number of cards
  const [sets, setSets] = useState([]);//the list of all sets
  const [cardType, setCardType] = useState([]);//list of all the Types
  const [cardSubType, setCardSubType] = useState([]);//list of all subtypes
  const [cardSuperType, setCardSuperType] = useState([]);//list of all supertypes
  const [cardAvailability, setCardAvailability] = useState([]);//list of all avalabilities
  const [cardRarity, setCardRarity] = useState([]);//list of all rarities
  const [cardKeyword, setCardKeyword] = useState([]);//list of all keywords
  const [cardLegalistiesState, setCardLegalitiesState] = useState(''); //the chosen legality keyword
  const [search, setSearch] = useState(''); //the chosen set
  const [query, setquery] = useState('');//the text being searched, can be empty
  const [setState, setSetState] = useState('');//the chosen set
  const [cardTypeState, setCardTypeState] = useState('');//the chosen type
  const [cardSubTypeState, setCardSubTypeState] = useState('')//the Chosen sub type
  const [cardSuperTypeState, setCardSuperTypeState] = useState('')//the Chosen super type
  const [cardAvailabilityState, setCardAvailabilityState] = useState('');//the Chosen avalibility
  const [cardRarityState, setCardRarityState] = useState('');//the Chosen Rarity
  const [cardKeywordState, setCardKeywordState] = useState([]);//list of all keywords
  const [colorState, setColorState] = useState('');//the selected colours
  const [pagesState, setPagesState] = useState(0);//the selected render of the page we are on
  //color based states, defines the styles of buttons
  const [whiteState, setWhiteState] = useState("search-bar-colors");
  const [blueState, setBlueState] = useState("search-bar-colors");
  const [blackState, setBlackState] = useState("search-bar-colors");
  const [redState, setRedState] = useState("search-bar-colors");
  const [greenState, setGreenState] = useState("search-bar-colors");
  const [colorLessState, setColorLessStateState] = useState("search-bar-colors");
  //Call from api initial call
  useEffect(() => {
    getCards();
    getCount();
    getSets();
    getTypes();
    getSubTypes();
    getSuperTypes();
    getAvailability();
    getRarity();
    getKeywords();
  }, [query, setState, colorState, cardTypeState, cardSubTypeState, cardSuperTypeState, cardAvailabilityState, cardRarityState, cardKeywordState, pagesState, cardLegalistiesState]);
  //Whenever called make the page state 0
  useEffect(() => {
    if(pagesState !== 0){
      setPagesState(0);
    }
  },[query, setState, colorState, cardTypeState, cardSubTypeState, cardSuperTypeState, cardAvailabilityState, cardRarityState, cardKeywordState, cardLegalistiesState]);
  //Whenever we load we run this effect
  useEffect(() => {
    getUpdatable();
  },[]);
  //initial api request
  const getUpdatable = async () => {
    try{
      var FULL_URL = BASE_URL + "/update";
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setUpdateState(data.result);
    }catch(err){
      console.log(err);
    }
  }
  const getSets = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/sets?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setSets(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getTypes = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/types?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardType(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getSubTypes = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/subtypes?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardSubType(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getSuperTypes = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/supertypes?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardSuperType(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getAvailability = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/availability?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardAvailability(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getRarity = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/rarity?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardRarity(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getKeywords = async () => {
    try{
      var FULL_URL = BASE_URL +"/card/keywords?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data = await responce.json();
      setCardKeyword(data.message);
    }catch(err){
      console.log(err);
    }
  }
  const getCards = async () => {
    try{
      var FULL_URL = BASE_URL+"/card/search?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data =  await responce.json();
      setCards(data.cards);
      console.log(data.cards);
    }catch(err){
      console.log(err);
    }
  }
  const getCount = async () => {
    try{
      var FULL_URL = BASE_URL+"/card/count?";
      FULL_URL = constructQuery(FULL_URL);
      const responce = await fetch(FULL_URL);
      const data =  await responce.json();
      setCount(data.returnCount);
      console.log(data.returnCount);
    }catch(err){
      console.log(err);
    }
  }
  const normalSearch = e => {
    setSearch(e.target.value);
  }
  const searchSetState = e => {
    setSetState(e.target.value);
  }
  const searchTypeState = e => {
    setCardTypeState(e.target.value);
  }
  const searchSubTypeState = e => {
    setCardSubTypeState(e.target.value);
  }
  const searchSuperTypeState = e => {
    setCardSuperTypeState(e.target.value);
  }
  const searchAvailabilityState = e => {
    setCardAvailabilityState(e.target.value);
  }
  const searchRarityState = e => {
    setCardRarityState(e.target.value);
  }
  const searchKeywordState = e => {
    setCardKeywordState(e.target.value);
  }
  const searchLegalitiesState = e => {
    setCardLegalitiesState(e.target.value);
  }
  const simpleSearch = e => {
    e.preventDefault();
    setquery(search);
  }
  const startUpdate = e => {
    try{
      var FULL_URL = BASE_URL + "/update/exc";
      fetch(FULL_URL);
      //console.log(FULL_URL);
      setUpdateState(false);
      alert('Update started, this will probably take some time, feel free to keep using the service');
    }catch(err){
      console.log(err);
    }
  }
  const pageBack = e => {
    if ((pagesState - 1) >= 0 ) {
      setPagesState(pagesState - 1);
    }
  }
  const pageForward = e => {
    setPagesState(pagesState + 1);
  }
  function addColours(color) {
    switch(color){
      case 'W':
        if(!colorState.includes('0')){
          if(colorState.includes('W')){
            const newColorState = colorState.replace('W','');
            setColorState(newColorState);
            setWhiteState("search-bar-colors");
            break;
          }
          else{
            setColorState(colorState + 'W');
            setWhiteState("w-active");
            break;
          }
        }else{
          setColorState('W');
          setWhiteState("w-active");
          setColorLessStateState("search-bar-colors");
          break;
        }
      case 'U':
        if(!colorState.includes('0')){
          if(colorState.includes('U')){
            const newColorState = colorState.replace('U','');
            setColorState(newColorState);
            setBlueState("search-bar-colors");
            break;
          }
          else{
            setColorState(colorState + 'U');
            setBlueState("u-active");
            break;
          }
        }else{
          setColorState('U');
          setBlueState("u-active");
          setColorLessStateState("search-bar-colors");
          break;
        }
      case 'B':
        if(!colorState.includes('0')){
          if(colorState.includes('B')){
            const newColorState = colorState.replace('B','');
            setColorState(newColorState);
            setBlackState("search-bar-colors");
            break;
          }
          else{
            setColorState(colorState + 'B');
            setBlackState("b-active");
            break;
          }
        }else{
          setColorState('B');
          setBlackState("b-active");
          setColorLessStateState("search-bar-colors");
          break;
        }
      case 'R':
        if(!colorState.includes('0')){
          if(colorState.includes('R')){
            const newColorState = colorState.replace('R','');
            setRedState("search-bar-colors");
            setColorState(newColorState);
            break;
          }
          else{
            setColorState(colorState + 'R');
            setRedState("r-active");
            break;
          }
        }else{
          setColorState('R');
          setRedState("r-active");
          setColorLessStateState("search-bar-colors");
          break;
        }
      case 'G':
        if(!colorState.includes('0')){
          if(colorState.includes('G')){
            const newColorState = colorState.replace('G','');
            setColorState(newColorState);
            setGreenState("search-bar-colors");
            break;
          }
          else{
            setColorState(colorState + 'G');
            setGreenState("g-active");
            break;
          }
        }else{
          setColorState('G');
          setGreenState("g-active");
          setColorLessStateState("search-bar-colors");
          break;
        }
      case '0':
        if(!colorState.includes('0')){
          setColorState('0');
          setWhiteState("search-bar-colors");
          setBlueState("search-bar-colors");
          setBlackState("search-bar-colors");
          setRedState("search-bar-colors");
          setGreenState("search-bar-colors");
          setColorLessStateState("c-active");
          break;
        }else{
          setColorState('');
          setColorLessStateState("search-bar-colors");
          break;
        }
      default:
        break;
    }
  }
  function constructQuery(FULL_URL) {
    var reformedURL = FULL_URL;
    reformedURL = reformedURL+"text="+query+"&";
      if (setState !== "" && !FULL_URL.includes('/sets?')){
        //console.log(setState);
        reformedURL = reformedURL+"&set="+setState+"&";
      }
      if (colorState !== ""){
        //console.log(colorState);
        reformedURL = reformedURL+"&color=" + colorState + "&";
      }
      if (cardTypeState !== "" && !FULL_URL.includes('/types?')){
        //console.log(cardTypeState);
        reformedURL = reformedURL+"&type=" + cardTypeState + "&";
      }
      if (cardSubTypeState !== "" && !FULL_URL.includes('/subtypes?')){
        //console.log(cardSubTypeState);
        reformedURL = reformedURL+"&subtype=" + cardSubTypeState + "&";
      }
      if (cardSuperTypeState !== "" && !FULL_URL.includes('/supertypes?')){
        //console.log(cardSuperTypeState);
        reformedURL = reformedURL+"&supertype=" + cardSuperTypeState + "&";
      }
      if (cardAvailability !== "" && !FULL_URL.includes('/availability?')){
        //console.log(cardAvailabilityState);
        reformedURL = reformedURL+"&availability=" + cardAvailabilityState + "&";
      }
      if (cardRarity !== "" && !FULL_URL.includes('/rarity?')){
        //console.log(cardRarityState);
        reformedURL = reformedURL+"&rarity=" + cardRarityState + "&";
      }
      if (cardKeyword !== "" && !FULL_URL.includes('/keywords?')){
        //console.log(cardRarityState);
        reformedURL = reformedURL+"&keywords=" + cardKeywordState + "&";
      }
      if (cardLegalistiesState !== ''){
        reformedURL = reformedURL+"&legalities=" + cardLegalistiesState + "&";
      }
      if (pagesState > 0 && FULL_URL.includes('/search?')){
        reformedURL = reformedURL+"&next=" + pagesState + "&";
      }
    return reformedURL;
  }

  return(
    <div className="App"> {/*Whole page*/}
      <div>
        <div className="header"> {/*Header */}
          <h1>
            Card Collection
          </h1>
          <p>{"Cards found: " + count}</p>
          <div>
            <button disabled={!updateState} onClick={startUpdate}>
              Update
            </button>
          </div>
        </div>
        <form className="search-form" onSubmit={simpleSearch}> {/*Navigation*/}
          <div> {/*Color buttons */}
            <button className={"color-btn-base " + whiteState + " hover-w"} type="button" onClick={() => addColours('W')}> 
              <i className="ms ms-w ms-fw ms-2x"></i>
            </button>
            <button className={"color-btn-base " + blueState + " hover-u"} type="button" onClick={() => addColours('U')}>
              <i className="ms ms-u ms-fw ms-2x"></i>
            </button>
            <button className={"color-btn-base " + blackState + " hover-b"} type="button" onClick={() => addColours('B')}>
              <i className="ms ms-b ms-fw ms-2x"></i>
            </button>
            <button className={"color-btn-base " + redState + " hover-r"} type="button" onClick={() => addColours('R')}>
              <i className="ms ms-r ms-fw ms-2x"></i>
            </button>
            <button className={"color-btn-base " + greenState + " hover-g"} type="button" onClick={() => addColours('G')}>
              <i className="ms ms-g ms-fw ms-2x"></i>
            </button>
            <button className={"color-btn-base " + colorLessState + " hover-c"} type="button" onClick={() => addColours('0')}>
              <i className="ms ms-c ms-fw ms-2x"></i>
            </button>
          </div>
          <input className="search-bar" type="text" value={search} onChange={normalSearch}/>
          <button className="search-button" type="submit">
            Search
          </button>
          <div>{/*Selector bars*/}
            <select className="search-button" name="selectorSets" id="setCode" value={setState} onChange={searchSetState}>
              <option value="">
                {"Set"}
              </option>
              {sets.map(theSet =>( 
                <option value={theSet}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theSet}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorLegalities" id="setLegalities" value={cardLegalistiesState} onChange={searchLegalitiesState}>
              <option value="">
                {"Legalities"}
              </option>
              <option value="Commander">
                {"Commander"}
              </option>
              <option value="Standard">
                {"Standard"}
              </option>
              <option value="Modern">
                {"Modern"}
              </option>
              <option value="Legacy">
                {"Legacy"}
              </option>
              <option value="Brawl">
                {"Brawl"}
              </option>
              <option value="Duel">
                {"Duel"}
              </option>
              <option value="Future">
                {"Future"}
              </option>
              <option value="Frontier">
                {"Frontier"}
              </option>
              <option value="Historic">
                {"Historic"}
              </option>
              <option value="Penny">
                {"Penny Dreadful"}
              </option>
              <option value="Pioneer">
                {"Pioneer"}
              </option>
              <option value="Vintage">
                {"Vintage"}
              </option>
              <option value="Pauper">
                {"Pauper"}
              </option>
            </select>
            <select className="search-button" name="selectorType" id="typecode" value={cardTypeState} onChange={searchTypeState}>
              <option value="">
                {"Type"}
              </option>
              {cardType.map(theType =>( 
                <option value={theType}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theType}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorSubType" id="subtypecode" value={cardSubTypeState} onChange={searchSubTypeState}>
              <option value="">
                {"Sub Type"}
              </option>
              {cardSubType.map(theSubType =>( 
                <option value={theSubType}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theSubType}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorSuperType" id="supertypecode" value={cardSuperTypeState} onChange={searchSuperTypeState}>
              <option value="">
                {"Super Type"}
              </option>
              {cardSuperType.map(theSuperType =>( 
                <option value={theSuperType}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theSuperType}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorAvalability" id="avalibilitycode" value={cardAvailabilityState} onChange={searchAvailabilityState}>
              <option value="">
                {"Availability"}
              </option>
              {cardAvailability.map(theAvailability =>( 
                <option value={theAvailability}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theAvailability}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorRarity" id="raritycode" value={cardRarityState} onChange={searchRarityState}>
              <option value="">
                {"Rarity"}
              </option>
              {cardRarity.map(theRarity =>( 
                <option value={theRarity}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theRarity}
                </option>
              ))}
            </select>
            <select className="search-button" name="selectorKeyword" id="keywordcode" value={cardKeywordState} onChange={searchKeywordState}>
              <option value="">
                {"Keyword"}
              </option>
              {cardKeyword.map(theKeyword =>( 
                <option value={theKeyword}>
                  {/*<i className={"ss ss-"+theSet.toLowerCase()}></i>*/}{" " + theKeyword}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div>{/*The main page*/}
        <div>{/*back and next buttons */}
          <button className="search-button" onClick={pageBack}>
            Back
          </button>
          <button className="search-button" onClick={pageForward}>
            Next
          </button>
        </div>
        <div className="cards"> {/*Card rendering*/}
          {cards.map(card =>(
          <Card
            imgID={card.identifiers.scryfallId}
            key={card.uuid}
            name={card.uuid}
            StartOwned={card.owned}
            SetCode={card.setCode}
            rarity={card.rarity}
            cardType={card.types}
            otherSide={card.otherFaceIds[0]} />
          ))}
        </div>
        <div>{/*back and next buttons */}
          <button className="search-button" onClick={pageBack}>
            Back
          </button>
          <button className="search-button" onClick={pageForward}>
            Next
          </button>
        </div>
      </div>
      <div className="footer"> {/*Footer*/}
        <a className="footer-mtgjson" href="https://mtgjson.com" >
          <img src="http://mtgjson.com/images/assets/logo-mtgjson-white.svg" alt="" width="60px" title="MTGJSON logo"></img>
          <p>
            Powered by MTGJSON
          </p>
        </a>
      </div>
    </div>
  )
}
export default App;