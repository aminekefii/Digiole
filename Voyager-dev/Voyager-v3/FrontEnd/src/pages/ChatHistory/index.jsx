import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase/firebase";
import { getDoc ,collection } from "/firebase/firestore";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ChatHistoryList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const db = firebase.database();
      const threadsRef = db.ref("threads"); // Reference to your threads collection in Firebase

      // Fetch threads from Firebase
      threadsRef.on("value", (snapshot) => {
        const threadsData = snapshot.val();
        if (threadsData) {
          const threadsArray = Object.values(threadsData);
          setThreads(threadsArray);
        }
      });
    };

    fetchThreads();
  }, []);

  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <TableCaption>Chat History</TableCaption>
        <Thead>
          <Tr>
            <Th>Chat ID</Th>
            <Th>Created at</Th>
            {/* Add more table headers as needed */}
          </Tr>
        </Thead>
        <Tbody>
          {threads.map((thread) => (
            <Tr key={thread.id}>
              <Td>{thread.id}</Td>
              <Td>{thread.createdAt}</Td>
              {/* Render more table cells for additional thread properties */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ChatHistoryList;
