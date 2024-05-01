import React, { useState, useEffect, useContext } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './contexts/authContext';
import { ProfilePic} from './firebase/firebase'; // Import updateUserProfile function
import {  updateUserProfile } from './firebase/auth'; // Import updateUserProfile function
import { auth } from './firebase/firebase';
import { AuthContext } from './contexts/authContext/index';
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";
function ProfilePicUpdate() {
    const { currentUser } = useContext(AuthContext);
      const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/images/Profilepic.png");

 
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setFiles([e.target.files[0]]);
    }
  };
  const handleClick = async () => {
    try {
        const uploadToast = toast.info('Upload in progress...', {
            position: 'top-right',
            autoClose: false, // Do not auto-close initially
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

        const updateProgress = (progress) => {
            toast.update(uploadToast, {
                render: `Upload in progress... ${Math.round(progress * 100)}%`,
                autoClose: false // Do not auto-close while uploading
            });
        };

        await ProfilePic(photo, auth.currentUser, setLoading, updateProgress); // Pass updateProgress function

        const photoURL = await auth.currentUser.photoURL; // Retrieve the updated photo URL
        setPhotoURL(photoURL);

        toast.success('Profile picture updated successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

       
        toast.dismiss(uploadToast);
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};

  
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

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
      <Image src={photoURL} borderRadius="50%" h="43px" w="43px" onClick={toggleModal} />
      {modal && (
        <div className="modal" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '250px' }}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <main style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <form
                style={{
                  width: '24rem',
                  color: '#4b5563',
                  marginTop: '1.25rem',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '180px' }}>
                  <input type="file" accept="image/*" onChange={handleChange} />
                  {files.length > 0 && (
                    <Image src={URL.createObjectURL(files[0])} alt="Preview" borderRadius="10px" boxSize="100px" />
                  )}
                </div>

                <section style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>

                    <button
                      type='button'
                      onClick={handleClick}
                      disabled={loading || !photo}
                      style={{
                        marginLeft: 'auto',
                        fontSize: '0.55rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 'bold',
                        color: 'black',
                        border: '1px solid #8b5cf6',
                        backgroundColor: '#3845DE',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s, color 0.2s'

                      }}
                    >
                      Update 
                    </button>
                  </div>
                </section>
              </form>
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

export default ProfilePicUpdate;
