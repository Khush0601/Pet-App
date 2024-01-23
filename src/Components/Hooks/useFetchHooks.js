import React, { useState } from 'react'

 export const useFetchHooks = (apiEndPoint) => {
    const initResponse={
        response:[],
        loading:false,
        error:"",
    }
 
 const [fetchResult,setFetchResult]=useState(initResponse)
 React.useEffect(()=>{
 const onFetch=async()=>{
    setFetchResult((p)=>{
        return{...p,loading:true,error:'',response:[]}
    })
  try{
  const apiResponse=await fetch(apiEndPoint)
  const result=await apiResponse.json()
  setFetchResult((p)=>{
    return{...p,loading:false,error:"",response:result}
  })
  }
  catch(e){
    setFetchResult((p)=>{
        return{...p,error:'something went wrong',loading:false}
    })
  console.log(e)
  }
 }
 onFetch()
 },[apiEndPoint])
console.log(fetchResult)
return fetchResult
}

