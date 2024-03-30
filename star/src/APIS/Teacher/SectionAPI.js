import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const AddSection = async({name, classID}) => {
    const res = await AxiosBase.post('edumanage/class/new-section',{
        sectionName: name,
        classId: classID
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteSection = async ({ id }) => {
    try {
        const res = await AxiosBase.delete(`edumanage/class/delete-section`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                sectionId: id
            }
        });        

        return res.data;
    } catch (error) {
        console.error('Error deleting class:', error);
    }
};

const UpdateSection = async({id, name}) => {
    const res = await AxiosBase.put('edumanage/class/update-section',{
        sectionName: name,
        sectionId: id
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}


export {AddSection, DeleteSection, UpdateSection}