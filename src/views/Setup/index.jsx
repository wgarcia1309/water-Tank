import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import _Form from './component/_Form';
import WaterControl from "../WaterControl";
import "./index.css"
export default function Setup(){
    const [minimun,setMinimun]=useState(0);
    const [maximun,setMaximun]=useState(10);
    const [highLvl,setHighLvl]=useState(8);
    const [lowLvl,setLowLvl]=useState(2);
    const [isConfigured,setIsConfigured]=useState(true);

    const handleEditClick=()=>{
        setIsConfigured(false);
    };

    const handleCancelClick=()=>{
        setIsConfigured(true);
    };
    const handleSuccessClick=(mx,min,hg,low)=>{
        
        console.log(mx,min,hg,low)
        setMaximun(mx);
        setMinimun(min);
        setHighLvl(hg);
        setLowLvl(low);
        setIsConfigured(true);  
    };
    
    return (
    <div className="mt-3">
        <div className="main-container">
            <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                <WaterControl 
                isConfigured={isConfigured}
                max={maximun}
                min={minimun}
                hg={highLvl}
                low={lowLvl}
                />
            </Col>
            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <div>
            <h3>setup</h3>

            <_Form  
            names={["Capacity","Alarms"]}
            inputs={[["Maximum","Minimum"],["High Level","Low Level"]]}
            defaultValues={[[maximun,minimun],[highLvl,lowLvl]]}
            defaulthandlers={[[setMaximun,setMinimun], [setHighLvl,setLowLvl]]}
            measure="Lts"
            isConfigured={isConfigured}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSuccessClick={handleSuccessClick}
            />
            </div>
            </Col>
        </div>
    </div>
    );
}