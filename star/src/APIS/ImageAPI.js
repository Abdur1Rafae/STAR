import { AxiosBase } from "./BaseUrl";

global.Buffer = require('buffer').Buffer;

function base64toFile({ base64String, filename }) {
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }
  
    const byteString = atob(matches[2]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([uint8Array], { type: 'image/png' });
    return new File([blob], filename, { type: 'image/png' });
  }
  
  
  

const UploadImage = async({image}) => {
    const file = base64toFile({base64String:image, filename:"screenshot.png"});
    console.log(file)
    const formData = new FormData();
    formData.append('image', file, 'screenshot.png');
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.post('teacherhub/upload-image',
        formData, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}

const UploadImageFile = async({image}) => {
    const formData = new FormData();
    formData.append('image', image, 'screenshot.png');
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.post('teacherhub/upload-image',
        formData, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}


const UserLogout = async() => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.post('session/logout',{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}

export {UploadImage, UploadImageFile, UserLogout}