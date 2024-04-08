import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from 'react-icons/fi';
import "../../styles/Modal.css";
import Dropzone from "components/DropZone";



function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:3000/upload', formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    };



const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



    return (
        <>
            
            
            <button type="button"   onClick={toggleModal}><label htmlFor="file-upload"   >
                <FiUpload style={{ cursor: 'pointer', marginLeft: '10px', height:'50px'}} />
            </label></button>

            {modal && (
        <div className="modal" style={{  alignItems: 'center', justifyContent: 'center' , marginTop:'250px'}} >
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
    
             <Dropzone></Dropzone>
            <h2>Upload Files</h2>
            <p>
              Lorem ipsum 
            </p>
           
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            
          </div>
          
        </div>
      )}





        </>
    );
}

export default FileUpload;
