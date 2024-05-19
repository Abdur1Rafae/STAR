import React, { useEffect, useState, useRef } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { baseUrl } from '../../APIS/BaseUrl';

const TFSetup = ({image, setImage,setImageFile, options, setOptions, isTrue, setIsTrue}) => {
    const [markedCorrect, setMarkCorrect] = useState(isTrue);
    const fileInputRef = useRef(null);
    const [userUpload, setUserUpload] = useState(false)

    

    const [choices, setChoices] = useState(options.length > 0 ? options : ["True", "False"]);

    useEffect(() => {
        setOptions([...choices])
    }, [choices])

    const handleSetCorrect = (choiceToSetCorrect) => {
        setMarkCorrect(choiceToSetCorrect == "True" ? true : false)
        setIsTrue(choiceToSetCorrect == "True" ? true : false)
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setUserUpload(true)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
        setImageFile(file)
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        setImage(null); 
        fileInputRef.current.value = null; 
    };

  return (
    <div>
        <div className='w-full flex justify-between'>
            <div className='w-1/2'>
                <div className='flex flex-col gap-2'>
                    {
                        choices.map((choice) => {
                            return (
                            <div className='flex gap-2 items-center'>
                                <FaCheckCircle className={`${choice == "True" && markedCorrect || choice == "False" && !markedCorrect ? 'text-green-500' : 'text-gray-600'} hover:cursor-pointer`} onClick={()=>handleSetCorrect(choice)}/>
                                <div className={`w-16 p-2 border-[1px] border-black rounded-md text-sm ${choice == "True" && markedCorrect || choice == "False" && !markedCorrect ? 'text-green-500' : 'text-gray-600'}`}>{choice}</div>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                    />
                    <button className={`${image ? 'hidden' : 'w-28 h-28'}`} onClick={handleClick}>
                        <FcAddImage className='w-full h-full' />
                    </button>
                    {image && (
                        <div className='flex flex-col gap-4'>
                            <img crossOrigin='anonymous' src={userUpload? image : `${baseUrl}teacherhub/`+image} alt="Uploaded Image" className='w-24 h-24'/>
                            <div className='flex justify-between '>
                                <button onClick={handleDeleteImage}><MdOutlineDeleteOutline className='text-2xl hover:text-red-500 hover:cursor-pointer'/></button>
                                <button className={`w-8 h-8`} onClick={handleClick}>
                                    <FcAddImage className='w-full h-full' />
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    </div>
  )
}

export default TFSetup