import React,{useState} from 'react'
import Img from './SHIVAAPPA.jpg'
import Dev from './Mahadev.jpeg'

const Statehandler = () => {
  const[image,setImage]=useState(Img)

  const changer=function(){
    setImage(Dev)
  }

  return (
    <div>
      <img src={image} alt="" onMouseEnter={changer}/>
    </div>
  )
}

export default Statehandler