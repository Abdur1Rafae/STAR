import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllClasses = async () => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`teacherhub/class-management/my-classes`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
};

const AddClass = async({name}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.post('teacherhub/class-management/new-class',{
        className: name
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteClass = async ({ id }) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await AxiosBase.delete(`teacherhub/class-management/delete-class/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });        

        return res.data;
    } catch (error) {
        console.error('Error deleting class:', error);
    }
};

const UpdateClass = async({id, name}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/class-management/update-class/${id}`,{
        className: name,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}


export {GetAllClasses, AddClass, DeleteClass, UpdateClass}