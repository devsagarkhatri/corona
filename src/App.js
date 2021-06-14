import Header from './Header/Header';
import InfoTab from './InfoTab/Infotab';
import CityTable from './CityTable/CityTable';
import './App.css';
import { useEffect, useState } from 'react';
import "./../node_modules/bootstrap/dist/css/bootstrap.css";

function App() {
  const [stateDataList, setStateDataList] = useState([]);
  const [state, setState] = useState('Total');
  const [currentState, setCurrentState] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/data.json")//https://api.covid19india.org/state_district_wise.json
        .then((response) => response.json())
        .then((data) => {          
          const stateDataList = data.statewise.map((state) => ({
            name: state.state,
            cases: state.confirmed,
            active:state.active,
            death: state.death,
            recovered:state.recovered
          }));          
          setStateDataList(stateDataList);
          setCurrentState(stateDataList[0]);
        })
    };
    getStateData();
  }, []);

  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/state_district_wise.json")
        .then((response) => response.json())
        .then((data) => {          
          setDistrictList(data);// console.log(data);
        })
    };
    getStateData();
  }, []);
  const onStateChange = (event) => {
    setState(event.target.value);
    var temp = stateDataList.filter(states => states.name === event.target.value);    
    setCurrentState(temp[0]);
  };
  const onClickStateChange = (data) => {
    console.log(data);
    setState(data);
    var temp = stateDataList.filter(states => states.name === data);    
    setCurrentState(temp[0]);
  };
  const excludeTotal = () => {
    return stateDataList.filter((search) => {
      var temp = "" + search['name'];
      if (!temp.toString().toLowerCase().includes('Total'.toLowerCase()) &&
          !temp.toString().toLowerCase().includes('State Unassigned'.toLowerCase())) {
          return search;    
      }
    });
  };
  return (    
    <div className="App container">
      <br/>
      <Header states={stateDataList} current={state} onStateChange={onStateChange}/>
      <div className="app_header" style={{display:"flex",justifyContent:"space-between"}}>
        <InfoTab title="Total Cases" data={currentState.cases} color="primary"/>
        <InfoTab title="Currently Active" data={currentState.active} color="danger" />
        <InfoTab title="Total Recovery" data={currentState.recovered} color="success"/>
      </div>
      <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
        {
          state!=='Total'? (<CityTable cityList={districtList[state]} state={state} />) :(<CityTable cityList={excludeTotal()} state={state} onClickStateChange={onClickStateChange}/>)
        }
      </div>
      
      <center>If you liked this project, checkout my other projects <a href="https://devsagarkhatri.github.io/">here.</a></center><br />
    </div>
  );
}

export default App;
