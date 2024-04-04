import React, { useEffect, useState, useRef } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";

const TFSetup = ({image, options, addOption}) => {
    const [markedCorrect, setMarkCorrect] = useState(false);
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(image);

    

    const [choices, setChoices] = useState(options.length > 0 ? options : [{ text: "True", isCorrect: true },
    { text: "False", isCorrect: false }]);

    useEffect(() => {
        const hasCorrect = choices.some(choice => choice.isCorrect)
        setMarkCorrect(hasCorrect);
    }, [choices])

    const handleSetCorrect = (choiceToSetCorrect) => {
        const updatedChoices = choices.map(choice => {
            if (choice === choiceToSetCorrect) {
                return { ...choice, isCorrect: true };
            } else {
                return { ...choice, isCorrect: false }; 
            }
        });
        setChoices(updatedChoices);
        addOption(updatedChoices)
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        setImageUrl(null); 
        fileInputRef.current.value = null; 
    };

  return (
    <div>
        <div className='w-full flex justify-between'>
            <div className='w-1/2'>
                {!markedCorrect && <p className='text-red-500 text-xs'>Mark atleast one correct choice</p>}
                <div className='flex flex-col gap-2'>
                    {
                        choices.map((choice) => {
                            return (
                            <div className='flex gap-2 items-center'>
                                <FaCheckCircle className={`${choice.isCorrect ? 'text-green-500' : 'text-gray-600'} hover:cursor-pointer`} onClick={()=>handleSetCorrect(choice)}/>
                                <div className={`w-16 p-2 border-[1px] border-black rounded-md text-sm ${choice.isCorrect ? 'text-green-500' : 'text-gray-600'}`}>{choice.text}</div>
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
                    <button className={`${imageUrl ? 'hidden' : 'w-28 h-28'}`} onClick={handleClick}>
                        <FcAddImage className='w-full h-full' />
                    </button>
                    {imageUrl && (
                        <div className='flex flex-col gap-4'>
                            <img src={imageUrl} alt="Uploaded Image" className='w-24 h-24'/>
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