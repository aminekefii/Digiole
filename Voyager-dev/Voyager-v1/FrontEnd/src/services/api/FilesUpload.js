import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from 'react-icons/fi';
import "../../styles/Modal.css";



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
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
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
