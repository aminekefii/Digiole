import React,{ useState, useCallback, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";
import "../../styles/index.css";
import "../../styles/font.css";
import { Link } from "react-router-dom";
import Header from "components/header";
import { doSignOut } from '../../components/firebase/auth';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import '../../styles/Modal.css';





export default function AssistantsPage() {





  
  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };

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
      <Helmet>
        <title>Assistants</title>
        <meta name="description" content="Web site created using create-react-app" />
      
      </Helmet>
      <Box pb={{ md: "107px", base: "20px" }} bg="white.A700_01" w="100%">
        <Flex flexDirection="column" alignItems="start">

          <Flex
            mt="-1px"
            position="relative"
            bg="indigo.A700_01"
            alignSelf="stretch"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            p={{ base: "20px", sm: "23px" }}
          >
            <Flex ml={{ md: "20px", base: "0px" }} w="18%" justifyContent="center" alignItems="center">
                      
            <Link to="/landingpage">  
  <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
</Link>
<Link to="/landingpage">  
 <Image src="images/img_voyager.svg" h="12px" ml="10px"/></Link>
              <Box h="23px" ml="20px" bg="blue_gray.100" w="1px" />
              <Text
                color="gray.50"
                ml="12px"
                letterSpacing= "-0.18px"
                fontWeight={300}
              >
              | Entrepreneurs
              </Text>
            </Flex>
            <Flex gap="21px" w="6%" justifyContent="center" alignItems="center">





              <Image src="images/img_avatar.png" borderRadius="50%" h="43px" w="43px" onClick={toggleModal}/>
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
                      Upload to Voyager
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



              <Button 
                    size="sm"
                    variant="outline"
                    colorScheme="lime_100"
                    color="white.A700_01"
                    letterSpacing="-0.08px"
                    fontWeight={500}
                    minW={{ base: '50px', md: '70px' }}
                    borderRadius="20px"
                    _hover={{ bg: '#EAF2BB', color: 'black' }}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    mr="50px"
              
              
              onClick={handleLogout}>Logout</Button>
            </Flex>
          </Flex>
          <Container
            mt="57px"
            gap="17px"
            display="flex"
            w="100%"
            alignItems="start"
            justifyContent="flex-start"
            maxW="90%"
            px="0px"
           
            flexDirection={{ md: "row", base: "column" }}
            p={{ md: "", base: "20px" }}
            pr="270px"
            
          >
            <Image src="images/img_info.svg" h="24px" mt="10px" w={{ md: "24px", base: "10%" }} />
            <Text
              color="gray.900_01"
              
              fontWeight={300}
              w={{ md: "97%", base: "100%" }}
              lineHeight="23px"
            >
              As an entrepreneur, you can streamline your startup&#39;s management and access support services
              efficiently, with automated resource matching, progress tracking, and actionable insights for informed
              decision-making.
            </Text>
          </Container>
          <Heading
            size="md"
            as="h1"
            color="gray.600"
            mt="58px"
            fontWeight={800}
            ml={{ md: "100px", base: "0px" }}
            letterSpacing="-0.29px"
            fontSize="26px"
            lineHeight="39px"
          >
            Assistants
          </Heading>
          <Flex
            mt="17px"
            ml={{ md: "63px", base: "0px" }}
            gap={{ md: "71px", base: "35px", sm: "53px" }}
            w={{ md: "49%", base: "100%" }}
            flexDirection="column"
            alignItems="start"
            p={{ md: "", base: "20px" }}
          >
            <Flex gap="28px" alignSelf="stretch" flexDirection={{ md: "row", base: "column" }}>
              <Flex
                gap="44px"
                bg="gray.50_02"
                w="100%"
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
                p="20px"
                borderRadius="8px"
              >
                <Flex mt="11px" gap="7px" alignSelf="stretch" flexDirection="column" alignItems="start">
                  <Heading size="xs" color="gray.700" >
                    Business Plan
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    lineHeight="120%"
                  >
                    Get expert guidance with our AI Business Plan Assistant
                  </Text>
                </Flex>
                <Button
                as={Link}
                to="/buissnessplan"
                  size="sm"
                  colorScheme="lime_200"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                >
                  Get Assistant
                </Button>
              </Flex>
              <Flex
                gap="28px"
                bg="gray.50_02"
                w="100%"
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
                p="20px"
                borderRadius="8px"
              >
                <Flex mt="13px" gap="5px" alignSelf="stretch" flexDirection="column" alignItems="start">
                  <Heading size="xs" as="h3" color="gray.700" >
                    Journey Log
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    lineHeight="120%"
                  >
                    Navigate your business journey with our AI-powered Log, connecting you with expert advice
                  </Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="lime_200"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                >
                  Get Assistant
                </Button>
              </Flex>
            </Flex>
            <Heading
              size="md"
              as="h4"
              color="gray.600"
              ml={{ md: "20px", base: "0px" }}
              letterSpacing="-0.29px"
              fontSize="26px"
            >
              <Heading size="md" as="span" color="gray.600">
                Assistants
              </Heading>
              <Heading size="md" as="span" color="gray.600">
                &nbsp;
              </Heading>
              <Heading size="md" as="span" color="gray.600" fontWeight={300}>
                Coming Soon
              </Heading>
            </Heading>
          </Flex>
          <Flex
            mt="33px"
            ml={{ md: "66px", base: "0px" }}
            gap="43px"
            bg="gray.50_02"
            w={{ md: "23%", base: "100%" }}
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            p="20px"
            borderRadius="8px"
          >
            <Flex mt="21px" gap="5px" flexDirection="column" alignItems="start" ml="20px">
              <Heading size="xs" color="gray.700" >
                Sha guidance
              </Heading>
              <Text size="s" color="gray.900_01" letterSpacing="-0.07px" >
                Get expert guidance with our..
              </Text>
            </Flex>
            <Button
              size="sm"
              colorScheme="lime_200"
              rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
              mb="21px"
              fontWeight={600}
              gap="8px"
              minW="161px"
              borderRadius="8px"
              ml="17px"
            >
              Get Assistant
            </Button>
          </Flex>
        </Flex>
      </Box>
      <ToastContainer />
    </>
  );
}
