import React, { useEffect, useState, useRef } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FcAddImage } from "react-icons/fc";
import { baseUrl } from '../../APIS/BaseUrl';

const MCQSetup = ({image, setImage,  options, addOption, correctOptions, setCorrectOption, setImageFile}) => {
    const [markedCorrect, setMarkCorrect] = useState(correctOptions ? correctOptions : []);
    const fileInputRef = useRef(null);

    const [choices, setChoices] = useState(options);
    const [userUpload, setUserUpload] = useState(false)
    const [imageUrl, setImageUrl] = useState(image)


    const handleInputChange = (event, index) => {
        const newChoice = event.target.value;
        const updatedChoices = [...choices];
        updatedChoices[index] = newChoice; 
        setChoices(updatedChoices); 
        addOption(updatedChoices);
    };

    const handleSetCorrect = (choice) => {
        const exists = markedCorrect.findIndex((option)=> option == choice)
        if(exists === -1) {
            setMarkCorrect([...markedCorrect, choice])
            setCorrectOption([...correctOptions, choice])
        } 
        else {
            const updatedMarkCorrect = [...markedCorrect]
            updatedMarkCorrect.splice(exists, 1)
            setMarkCorrect([...updatedMarkCorrect])
            setCorrectOption([...updatedMarkCorrect])
        }
    }

    const handleDeleteChoice = (choice) => {
        const updatedChoices = choices.filter((option)=>option !== choice)
        setChoices(updatedChoices)
        addOption(updatedChoices)
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setUserUpload(true)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log(imageUrl)
            setImage(imageUrl);
            setImageUrl(imageUrl)
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

    const handleAddChoice = () => {
        let updatedChoices = [...choices]
        updatedChoices.push("")
        setChoices(updatedChoices)
        addOption(updatedChoices)
    };

  return (
    <div>
        <div className='w-full flex flex-col md:flex-row justify-between'>
            <div className='md:w-1/2'>
                {markedCorrect.length == 0 && <p className='text-red-500 text-xs'>Mark atleast one correct choice</p>}
                <div className='flex flex-col gap-2'>
                    {
                        choices.length > 0 && choices.map((choice, index) => {
                            return <div key={index} className='flex gap-2 items-center'>
                                <FaCheckCircle className={`${markedCorrect.includes(choice) ? 'text-green-500' : 'text-gray-600'} hover:cursor-pointer`} onClick={()=>handleSetCorrect(choice)}/>
                                <input autoFocus type='text' onChange={(event)=>handleInputChange(event, index)} value={choice} className={`w-full p-2 border-[1px] border-black rounded-md text-sm ${markedCorrect.includes(choice) ? 'text-green-500' : 'text-gray-600'}`}/>
                                <MdOutlineDeleteOutline className='hover:text-red-500 hover:cursor-pointer' onClick={()=>handleDeleteChoice(choice)}/>
                            </div>
                        })
                    }
                </div>
                <button className='border-dashed mt-2 border-black border-[1px] p-2 flex items-center justify-center gap-2 bg-white text-xs' onClick={handleAddChoice}><FaCirclePlus/> Add Choice</button>
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
                            <img crossOrigin='anonymous' src={userUpload ? imageUrl :(`${baseUrl}teacherhub/`+image)} alt="Uploaded Image" className='w-24 h-24'/>
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

export default MCQSetup