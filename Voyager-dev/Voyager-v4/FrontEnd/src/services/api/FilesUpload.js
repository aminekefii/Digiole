import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import '../../styles/Modal.css';
import  {  useContext } from "react";
import { AuthContext } from '../../components/contexts/authContext/index'; 

function Dropzone({ className }) {


  const { currentUser } = useContext(AuthContext); 
  const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/images/Profilepic.png");


  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const acceptedTypes = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png', '.txt','.csv'];

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
    accept: ['.pdf', '.doc', '.docx', 'image/*', '.txt','.csv'],
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
      autoClose: false, // Do not auto close until upload status is known
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
      const token = await currentUser.getIdToken(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid }),
      };
      const formData = new FormData();

      // Iterate over files and upload one at a time
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('file', file);

        const response = await axios.post('http://localhost:3000/upload', formData,requestOptions);

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



  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])


  return (
    <>
      <button type="button" onClick={toggleModal}>
        <label htmlFor="file-upload">
          <FiUpload style={{ cursor: 'pointer', marginLeft: '10px', height: '50px' }} />
        </label>
      </button>

      {modal && (
        <div className="modal" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '250px' }}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <main style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <form
                onSubmit={handleSubmit}
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
                  {...getRootProps({ className: className })}
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
                      type='button'
                      onClick={removeAll}
                      style={{
                        fontSize: '0.55rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 'bold',
                        color: '#4b5563',
                        border: '1px solid #6b7280',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s, color 0.2s'
                      }}
                    >
                      Remove all files
                    </button>
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
                      onClick={handleSubmitWithToast} // Call handleSubmitWithToast instead of handleSubmit
                    >
                      Upload to Voyager
                    </button>
                  </div>

                  {/* Accepted files */}
                  <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginTop: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Accepted Files</h3>
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

                  {/* Rejected Files */}
                 
                </section>
              </form>
            </main>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

function FileUpload() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return <Dropzone />;
}

export default FileUpload;
