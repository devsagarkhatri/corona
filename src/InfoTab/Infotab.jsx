import React, { Component } from 'react';
import "./infotab.css";
import { Card, CardContent, Typography } from '@material-ui/core';

class InfoTab extends Component {
    state = {  }
    render() {
        var { title, data, color } = this.props;
        return (
            
            <Card className={"infotab_card bg-transparent border-start border-end border-"+color} style={{minWidth:"25%",borderRadius:"15px"}}>
                    <CardContent>
                        <Typography className="infotab_card_heading" color="textSecondary">
                            {title}
                        </Typography>
                        <h2 className="infotab_card_figures">{Number(data).toLocaleString()}</h2>
                    </CardContent>
                </Card>
                
            
         );
    }
}
 
export default InfoTab;