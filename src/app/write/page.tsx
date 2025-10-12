"use client"

import FroalaEditor from "@/components/usermenu/froala"
import Uppernav2 from "@/components/usermenu/uppernav2"




function Write() {
  return (
    <div className="h-screen flex flex-col">
   
    
      <Uppernav2 />
  
  
    <div className="flex-1 flex items-center justify-center">
      <FroalaEditor />
    </div>
  </div>
  
  )
}

export default Write
