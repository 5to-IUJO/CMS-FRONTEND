
import { ReactNode } from 'react';
import {
  Box,
} from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';
import PageEditor from '../organisms/PageEditor';


export default function Dashboard() {


  return (
    <>
      <Navbar/>
      <PageEditor/>
    </>
  );
}