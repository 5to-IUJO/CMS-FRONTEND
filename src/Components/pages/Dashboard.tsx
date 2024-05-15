
import { ReactNode } from 'react';
import {
  Box,
} from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';


export default function Dashboard() {


  return (
    <>
      <Navbar/>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}