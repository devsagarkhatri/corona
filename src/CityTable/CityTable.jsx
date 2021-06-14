import React, { Component } from 'react';
import { Select } from '@material-ui/core';
import "./../CityTable/citytable.css";

class CityTable extends Component {
    
    state = {
        cityName: [],
        temp:[]
    }
    
    componentDidMount=()=>{
        if ( this.props.state!=='Total')  {
            this.setState({ cityName: this.getData });
            console.log(this.getData);
        }
        else {
            this.setState({ cityName:this.props.cityList });
        }
    }

    getData = () => {        
        var {districtData,stateCode}  = this.props.cityList;        
        var cityName = [{}];
        for (const [key, value] of Object.entries(districtData)) {               // cityName.push({ key, value });
            var temp = [];
            for (const [attribute,attr_value] of Object.entries(value)) {
                if (attribute === 'active' || attribute === 'confirmed' || attribute === 'recovered') {
                    temp.push(attr_value);                        
                }                    
            }
            cityName.push({ key:key,confirmed:temp[1],active:temp[0],recovered:temp[2] });
            // this.setState({cityName:this.state.cityName.push({ key:key,confirmed:temp[1],active:temp[0],recovered:temp[2]  })}); // console.log(cityName);
        }        
        return cityName;
    }

    search=(textToSearch)=>{
        var city = [];
        city = this.getData().filter((search) => {
            // console.log(textToSearch);
            var temp = ""+search['key'];
            if (temp.toString().toLowerCase().includes(textToSearch.toLowerCase())) {
                return search;    
            }            
        });
        this.setState({cityName:city});        
    }

    searchStates = (textToSearch) => {
        var city = this.props.cityList;
        city = city.filter((search) => {
            var temp = "" + search['name'];
            if (temp.toString().toLowerCase().includes(textToSearch.toLowerCase())) {
                return search;    
            }
        });
        this.setState({cityName:city});
    }
    render() {
        if (this.props.cityList !== undefined) {
            if (this.props.state !== 'Total') {
                var cityName = this.getData();
                return (
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        {/* <input type="text" className="form form-control bg-transparent border-0 border-bottom border-dark col-lg-4 col-md-4 col-sm-12" id="myInput" onChange={(event)=>this.search(event.target.value)} placeholder={"Search in "+this.props.state}/> */}
                        <table className="table table-hover table-responsive">                        
                            <thead>
                                <tr>
                                    <th scope="col">Districts</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Recovered</th>
                                </tr>
                            </thead>
                            <tbody className="table-borderless">                    
                                {
                                    cityName.map(({confirmed,key,active,recovered}) => (                                            
                                        <tr key={key} className="border-0 border-bottom border-secondary">
                                            <td>{key}</td>
                                            <td>{confirmed}</td>
                                            <td>{active}</td>
                                            <td>{recovered}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                );    
            }
            else {
                return (
                    <div className="table-height col-lg-12 col-sm-12 col-md-12">
                        {/* <input type="text" className="form form-control bg-transparent border-0 border-bottom border-dark col-lg-4 col-md-4 col-sm-12" id="myInput" onChange={(event)=>this.searchStates(event.target.value)} placeholder="Search in India"/> */}
                        <table className="table table-hover table-responsive">
                            <thead className="border-0 border-bottom border-dark">
                                <tr>
                                    <th scope="col">States<small> ( Click on the state to know more )</small></th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Recovered</th>
                                </tr>
                            </thead>
                            <tbody>                    
                                {
                                    this.props.cityList.map(({ cases, name, active, recovered }) => (                                        
                                        <tr key={name} className="border-0 border-bottom border-secondary" onClick={(event)=>this.props.onClickStateChange(name)}
                                        >
                                            <td>{name}</td>
                                            <td>{cases}</td>
                                            <td>{active}</td>
                                            <td>{recovered}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                );
            }                        
        }    
    }
}
 
export default CityTable;