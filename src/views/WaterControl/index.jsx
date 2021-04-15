import WaterTank from "../WaterTank";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup'
import "../Setup/index.css"
import { useEffect, useState } from "react";
export default function WaterControl({isConfigured,min,max,hg,low}){
    
    const [currentValue,setCurrentValue]=useState(Math.floor((min+max)/2));
    const [error,setError]=useState(false)
    const [drain,setDrain]=useState(false)
    const [errorOperation, SetErrorOperation]=useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd=()=>{
        setDrain(false)
        setError(false);
        SetErrorOperation(false);
        if(currentValue<max){
            setCurrentValue(currentValue+1);
        }else{
            SetErrorOperation(true);
        }
        
    }
    const handleSubstract=()=>{
        setError(false);
        setDrain(false);
        SetErrorOperation(false);
        if(currentValue>min){
            setCurrentValue(currentValue-1);
        }else{
            SetErrorOperation(true);
        }
    }
    const handleSet=(e)=>{
        setDrain(false)
        setError(false);
        SetErrorOperation(false);
        let value=parseInt(e.target.form[0].value)
        if( !isNaN(value) && value<=max && value>=min){
            setCurrentValue(value)
        }else{
            setError(true);
        }
    }

    useEffect(()=>{setCurrentValue(Math.floor((min+max)/2))},[min,max])
    return (
        <div className="main-container">
        <Col xl={9} lg={9} md={9} sm={9} xs={9}>
            <WaterTank
            currentValue={currentValue}
            min={min}
            max={max}
            hg={hg}
            low={low}
            />
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3}>
            <div>
                <Form >
                    <Form.Control type="text"  readOnly  className="mb-2" value={currentValue}/>
                    <div className="button-container">
                        <Button 
                        disabled={!isConfigured}
                        onClick={handleAdd}>
                            +
                        </Button>
                        <Button 
                        disabled={!isConfigured}
                        onClick={handleSubstract}>
                            -
                        </Button>
                    </div>
                    {errorOperation && 
                        (
                        <div class="alert alert-danger mt-3" role="alert">
                                Out of boundaries
                        </div>
                        )}
                </Form>
            </div>
        <Form>
            <Form.Group >
          <Form.Label>Set Points (Lts)</Form.Label>
        <InputGroup >
          <Form.Control
            type="number"
            placeholder="Enter a number"
            defaultValue={currentValue}
            aria-describedby="inputGroupAppend"
            required
            pattern = "[0-9]*"
            readOnly={!isConfigured}
          />
        </InputGroup>
      </Form.Group>
      
        <Button
        disabled={!isConfigured}
        onClick={(e)=>handleSet(e)}
        block>
            Set
        </Button>
        {error && 
        (
        <div class="alert alert-danger mt-3" role="alert">
                Out of boundaries
        </div>
        )}
      </Form>
        <div class="mt-3">
            <Button  
            variant="danger" 
            disabled={!isConfigured}
            onClick={()=>{
                handleShow()
                SetErrorOperation(false);
                setError(false)
                setDrain(false)
            }}
            block>
                Drain
            </Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>you are going to set the water level to minimum</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={
              ()=>{
                  handleClose(); 
                setCurrentValue(min);
                
                setDrain(true)
                }
                  }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
            {drain && 
        (
        <div class="alert alert-success mt-3" role="success">
                water level setted to minimum
        </div>
        )}
        </div>
        </Col>
        </div>
    );
}