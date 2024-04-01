import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllClasses = async () => {
    const res = await AxiosBase.get(`edumanage/class/my-classes`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
};

const AddClass = async({name}) => {
    const res = await AxiosBase.post('edumanage/class/new-class',{
        className: name
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteClass = async ({ id }) => {
    try {
        const res = await AxiosBase.delete(`edumanage/class/delete-class`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                classId: id
            }
        });        

        return res.data;
    } catch (error) {
        console.error('Error deleting class:', error);
    }
};

const UpdateClass = async({id, name}) => {
    const res = await AxiosBase.put('edumanage/class/update-class',{
        className: name,
        classId: id
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}


export {GetAllClasses, AddClass, DeleteClass, UpdateClass}