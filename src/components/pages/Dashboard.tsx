
import { ReactNode, useState } from 'react';

import Navbar from '../organisms/Navbar';

import { useForm } from 'react-hook-form';
import NewBlogStepOne from '../organisms/NewBlogStepOne';
import NewBlogStepTwo from '../organisms/NewBlogStepTwo';

type Data = {
  id: number;
  title: string;
  blog_image: FileList;
  tags: string[];
  content?: TrustedHTML | any;
}


export default function Dashboard() {
    const [data, setData] = useState<Data>();
    const [step,setStep] = useState<Number>(1);
  
    return (
      <>
        <Navbar />
        
        {step === 1 && (
          <NewBlogStepOne setData={setData} setStep={setStep} />
        )}

        {step === 2 && (
          <NewBlogStepTwo data={data}  />
        )}
        
        {/* <PageEditor/>*/}

      </>
    );
}