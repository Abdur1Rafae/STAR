import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const AddSection = async({name, classID}) => {
    const res = await AxiosBase.post(`teacherhub/class-management/new-section/${classID}`,{
        sectionName: name
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteSection = async ({ id }) => {
    console.log(id)
    try {
        const res = await AxiosBase.delete(`teacherhub/class-management/delete-section/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });        

        return res.data;
    } catch (error) {
        console.error('Error deleting class:', error);
    }
};

const UpdateSection = async({id, name}) => {
    const res = await AxiosBase.put(`teacherhub/class-management/new-section/${id}`,{
        sectionName: name
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}


export {AddSection, DeleteSection, UpdateSection}