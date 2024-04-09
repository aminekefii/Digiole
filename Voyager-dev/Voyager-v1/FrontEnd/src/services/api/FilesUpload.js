import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import '../../styles/Modal.css';

function Dropzone({ className }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['.pdf', '.doc', '.docx', 'image/*'], // Accepted files
    onDrop
  });

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
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

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Check if files exist
    if (!files.length) {
      console.log('No files to upload');
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
  
    // Append each file to FormData object
    files.forEach(file => {
      formData.append('file', file);
    });
  
    // Send FormData to server
    axios.post('http://localhost:3000/upload', formData)
      .then(res => {
        console.log(res.data);
        // Display a toast notification for successful upload
        toast.success  ('Uploaded successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      })
      .catch(error => {
        console.error(error);
        toast.error(error.message); // Toast the error message
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

                {/* Preview */}
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
                        color: '#4b5563',
                        border: '1px solid #8b5cf6',
                        backgroundColor: '#8b5cf6',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s, color 0.2s'
                       
                      }}
                      onClick={handleSubmit}
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
                  <h3 style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 'bold', color: '#6b7280', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Rejected Files</h3>
                  <ul style={{  marginTop: '0.5rem', maxHeight: '100px', overflowY: 'auto', listStyle: 'none', padding: '0' }}>
                    {rejected.map(({ file, errors }) => (
                      <li key={file.name} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ marginTop: '0.2rem', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>
                            {file.name}
                          </p>
                          <ul style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: '#ef4444' }}>
                            {errors.map(error => (
                              <li key={error.code}>{error.message}</li>
                            ))}
                          </ul>
                        </div>
                        <button
                          type='button'
                          style={{
                            marginTop: '0.5rem',
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
                          onClick={() => removeRejected(file.name)}
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
