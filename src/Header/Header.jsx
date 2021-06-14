import React, { Component } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';

class Header extends Component {
    state = {  }
    render() {
        
        return (
            <div className="app_header" style={{ marginTop: "2px" }}>
                
                <h1 style={{fontFamily: "Montserrat Subrayada , sans-serif"}}>Corona Tracker</h1>
                <FormControl>
                    <small style={{textAlign:"right"}}><i>Currently Viewing</i></small>
                    <Select
                        variant="standard"
                        
                        onChange={this.props.onStateChange}
                        value={this.props.current}
                    >                        
                        {this.props.states.map((state) => (
                            <MenuItem value={state.name} key={state.name}>
                                {state.name === "Total" ? "India" : state.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
         );
    }
}
 
export default Header;