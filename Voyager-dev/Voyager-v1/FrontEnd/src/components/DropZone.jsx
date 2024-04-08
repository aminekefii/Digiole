import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Dropzone = ({ className }) => {
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
    accept: ['.pdf', '.doc', '.docx', 'image/*'], // Accept PDFs, Word documents, and images
    maxSize: 1024 * 1000,
    onDrop
  });

  useEffect(() => {
    // Revoke the data URIs to avoid memory leaks
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

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    formData.append('upload_preset', 'friendsbook');

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json());

    console.log(data);
  };

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
        <div {...getRootProps({ className: className })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' , height:'180px'}}>
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
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#4b5563' ,width:'70px' }} >Preview</h2>
            <button
              type='button'
              onClick={removeAll}
              style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: '#4b5563', border: '1px solid #6b7280', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s' }}
            >
              Remove all files
            </button>
            <button
              type='submit'
              style={{ marginLeft: 'auto', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: '#4b5563', border: '1px solid #8b5cf6', backgroundColor: '#8b5cf6', borderRadius: '0.375rem', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s' }}
            >
              Upload to Voyager
            </button>
          </div>

          {/* Accepted files */}
          <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginTop: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Accepted Files</h3>
          <ul style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {files.map(file => (
              <li key={file.name} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontWeight: 'bold' }}>
                    {file.name}
                  </p>
                </div>
                <button
                  type='button'
                  style={{ marginTop: '0.5rem', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: '#6b7280', border: '1px solid #6b7280', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', padding: '0.25rem 1rem', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s' }}
                  onClick={() => removeFile(file.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', marginTop: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Rejected Files</h3>
          <ul style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rejected.map(({ file, errors }) => (
              <li key={file.name} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontWeight: 'bold' }}>
                    {file.name}
                  </p>
                  <ul style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                    {errors.map(error => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type='button'
                  style={{ marginTop: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: '#6b7280', border: '1px solid #6b7280', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', padding: '0.25rem 1rem', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s' }}
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
  );
};

export default Dropzone;
