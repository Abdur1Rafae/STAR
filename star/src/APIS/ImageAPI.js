import { AxiosBase } from "./BaseUrl";

global.Buffer = require('buffer').Buffer;

function base64toFile({base64String, filename}) {
    const buffer = global.Buffer.from(base64String, 'base64');
    const blob = new Blob([buffer], { type: "image/png" });
    return new File([blob], filename, { type: "image/png" });
}

const UploadImage = async({image}) => {
    const file = base64toFile({base64String:image, filename:"screenshot.png"});
    const formData = new FormData();
    formData.append('image', file, 'screenshot.png');
    const token = localStorage.getItem('token')
    const res = await AxiosBase.post('teacherhub/upload-image',
        formData, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}


const UserLogout = async() => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.post('session/logout',{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}

export {UploadImage, UserLogout}