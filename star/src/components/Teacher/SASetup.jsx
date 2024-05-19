import React, {useState, useRef } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { baseUrl } from '../../APIS/BaseUrl';

const SASetup = ({image, setImage, setImageFile}) => {
    const fileInputRef = useRef(null);
    const [userUpload, setUserUpload] = useState(false)

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
            <div className='flex justify-center items-center'>
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

export default SASetup