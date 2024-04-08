import axios from "axios";
import { useEffect, useState } from "react";
import './stylesheets/SaveTemplate.css';
import {Button} from 'react-bootstrap';
import { ITemplate } from "../interfaces/ITemplate";

interface SaveTemplateProps {
    questions: {questionType: string, question: string}[];
    onClose: () => void;
  }
  
  function SaveTemplate ({ questions, onClose }: SaveTemplateProps) {
  
  
    const [name, setName] = useState("");
    const [info, setInfo] = useState("")
    const [missingInfo, setMissingInfo] = useState<boolean>(false);
  
    const handleNameChange = (value: string) => {
        const updatedName = value
        setName(updatedName);
    };

    const handleInfoChange = (value: string) => {
        const updatedInfo = value
        setInfo(updatedInfo);
    };
  
    const createNewTemplate = async (newTemplateData: Partial<ITemplate>) => {
        const response = await axios.post<ITemplate[]>(`http://localhost:8080/template/savedTemplates`, newTemplateData) //ändra /templates/...
            .then(function (response) {
            //setSavedTemplates(response.data);
            onClose()
            console.log(response);
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log("error: " + error);
            });
    };

    function handleExit() {
        setMissingInfo(false);
        setName('');
        setInfo('');
        onClose();
    }

    function handleSaveTemplate() {

        if (name.length > 0){
            setMissingInfo(false)
            const newTemplateData: Partial<ITemplate> = {
                name: name,
                info: info,
                questions: questions
            };
            console.log(newTemplateData)
            createNewTemplate(newTemplateData)
        }
        else{
            setMissingInfo(true)
        }
    };
  
    return (
        <div className="saveTemplateContainer">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name of Template</label>
                <input  className="form-control form-control-lg" 
                        id="nameId"
                        type="text" value={name} 
                        aria-label=".form-control-lg example" 
                        onChange={(e) => handleNameChange(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Template info</label>
                <textarea   className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows={4}
                            style={{ resize: 'none' }}
                            value={info}
                            onChange={(e) => handleInfoChange(e.target.value)}/>
            </div>
            <div className="missingInfoCont">
                {missingInfo && ( <p className="missingInfo">Please fill in name to create new template</p> )}
            </div>
            <Button className="btn-exit" onClick={handleExit}>Exit</Button>
            <Button className="btn-create" onClick={handleSaveTemplate}>Create new template</Button>
        </div>
    );
  }
  
  
  export default SaveTemplate;