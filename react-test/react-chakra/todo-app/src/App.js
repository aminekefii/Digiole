import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import './App.css';

const App = () => {
  return (
    <>
      <Flex w='100%' h='100vh'>
        <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%' >
          <Text fontWeight='700' fontSize={30}>Tasks</Text>
        </Flex>
      </Flex>


    </>

  );
}

export default App;

