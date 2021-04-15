import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import "./index.css"


export default function _Form({names,inputs,measure,isConfigured,defaultValues,handleEditClick,handleCancelClick,handleSuccessClick}){
  const [error,setError]=useState(false);
  const inputsfields=(index)=>inputs[index].map((inputName,subIndex)=>(
        <Form.Group controlId={`${inputName}`}>
          <Form.Label>{inputName}</Form.Label>
        <InputGroup >
          <Form.Control
            type="text"
            placeholder="Enter a number"
            defaultValue={defaultValues[index][subIndex]}
            aria-describedby="inputGroupAppend"
            required
            pattern = "[0-9]*"
            readOnly={isConfigured}
          />
          <InputGroup.Append>
            <InputGroup.Text id={`inputGroupAppend${inputName}`}>{measure}</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    ));
    
    const inputsItems= names.map((name,index)=>(
      <>
      <h5 key={name}>{name}</h5>
      {inputsfields(index)}
      </>
    ));

    const handleSubmit=(e)=>{
      e.preventDefault();
      let mx=parseInt(e.target.form[0].value);
      let min=parseInt(e.target.form[1].value);
      let hg=parseInt(e.target.form[2].value);
      let low=parseInt(e.target.form[3].value);
      if ( isNaN(mx) || isNaN(min) || isNaN(hg) || isNaN(low) || mx<=min || low<min || hg>mx || hg<low ||min<0 || low<0){
        setError(true);
      }else{
        handleSuccessClick(mx,min,hg,low);
        setError(false);
      }
      
    }
    return(
        <Form>
          <>
            {inputsItems}
          </>
          {error && (<div class="alert alert-danger" role="alert">
                        verify the input data
                      </div>
                      )}
          <div className="button-container">
                <Button 
                variant="warning"
                onClick={handleEditClick}>
                  Edit
                </Button>

                <Button 
                variant="danger"
                type="reset" 
                onClick={()=>{
                  setError(false)
                  handleCancelClick()}}>
                  cancel
                </Button>

                <Button 
                variant="success" 
                type="submit" 
                onClick={handleSubmit}>
                    Confirm
                    </Button>
            </div>
            
        </Form>
    )
}