import React, { useState, useEffect, useContext } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase/firebase';
import { AuthContext } from './contexts/authContext/index';
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";


function GetAssisant() {


  const { currentUser } = useContext(AuthContext);


 
  const [files, setFiles] = useState([]);



  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
     
      <Button
                //as={Link}
                //to="/buissnessplan"
                  size="sm"
                  colorScheme="lime_200"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                  onClick={toggleModal}
                >
                  Get Assistant
                </Button>
      {modal && (
        <div className="modal" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '250px' }}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <main style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              
            </main>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GetAssisant;
