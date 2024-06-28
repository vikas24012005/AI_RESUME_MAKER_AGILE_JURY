import React from 'react'
import { useParams } from 'react-router-dom'
import ResumeForm from '../components/ResumeForm'
import Preview from '../components/Preview'
import data from "../../../../../data/dummy";

export function EditResume() {
  const { resume_id } = useParams()
  console.log(data);
  console.log(resume_id)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10' >
      <ResumeForm />
      <Preview />
    </div>
  )
}

export default EditResume