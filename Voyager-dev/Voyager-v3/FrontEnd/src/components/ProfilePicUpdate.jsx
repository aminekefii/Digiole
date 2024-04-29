import React,{ useState, useCallback, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import '../styles/Modal.css';
import { useAuth } from './contexts/authContext';

function ProfilePicUpdate() {


  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("data:image/png;base64,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"
);


  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])







  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);



  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const acceptedTypes = [ '.jpeg', '.jpg', '.png'];

    // Filter accepted files
    const filteredAcceptedFiles = acceptedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return acceptedTypes.includes('.' + fileExtension);
    });

    // Filter rejected files
    const filteredRejectedFiles = rejectedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return !acceptedTypes.includes('.' + fileExtension);
    });

    // Update state for accepted files
    if (filteredAcceptedFiles.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...filteredAcceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ]);
    }

    // Update state for rejected files
    if (filteredRejectedFiles.length) {
      const newRejectedFiles = filteredRejectedFiles.map(file => ({
        file,
        errors: [{ message: 'File type not supported' }]
      }));
      setRejected(previousFiles => [...previousFiles, ...newRejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: [ 'image/*'],
    onDrop
  });

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmitWithToast = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Show "Uploading in progress" toast
    const uploadToastId = toast.info('Uploading in progress', {
      position: "top-right",
      autoClose: false, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(async () => {
      await handleSubmit(e); // Pass the event object to handleSubmit
      // Hide "Uploading in progress" toast once all files are uploaded
      toast.dismiss(uploadToastId);
    }, 100); // Delay execution by 100 milliseconds
  };

  const handleSubmit = async (e) => {
    if (!files.length) {
      console.log('No files to upload');
      return;
    }

    try {
      const formData = new FormData();

      // Iterate over files and upload one at a time
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('file', file);

        const response = await axios.post('http://localhost:3000/', formData);

        console.log(response.data);
        toast.success('Uploaded successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Clear formData for next file
        formData.delete('file');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }






  return (
    <>
      <Image src={photoURL}  borderRadius="50%" h="43px" w="43px" onClick={toggleModal}/>
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
                <div
                  {...getRootProps()}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '180px' }}
                >
                  <input {...getInputProps()} />
                  <ArrowUpTrayIcon style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} />
                  {isDragActive ? (
                    <p style={{ marginTop: '0.5rem' }}>Drop the files here ...</p>
                  ) : (
                    <p style={{ marginTop: '0.5rem' }}>Drag & drop files here, or click to select files</p>
                  )}
                </div>

                <section style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#4b5563', width: '70px' }}>Preview</h2>
              
                    <button
                      type='submit'
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
                      Update profile picture
                    </button>
                  </div>

                  {/* Accepted files */}
                  <ul style={{ marginTop: '0.5rem', maxHeight: '100px', overflowY: 'auto', listStyle: 'none', padding: '0' }}>
                    {files.map(file => (
                      <li key={file.name} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flexGrow: '1' }}>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 'bold' }}>
                            {file.name}
                          </p>
                        </div>
                        <button
                          type='button'
                          style={{
                            fontSize: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 'bold',
                            color: '#6b7280',
                            border: '1px solid #6b7280',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '0.375rem',
                            padding: '0.25rem 1rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s, color 0.2s'
                          }}
                          onClick={() => removeFile(file.name)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

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
