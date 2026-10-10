import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react'

function Loading() {
  const {nextUrl} = useParams()
  const {navigate} = useAppContext()
  
  useEffect(()=>{if(nextUrl){
    setTimeout(()=>{
      navigate('/' +  nextUrl)
    }, 8000)
  }})
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='animate-spin rounded-full h-14 w-14 border-4 border-primary border-t-transparent'></div>
    </div>
  )
}

export default Loading