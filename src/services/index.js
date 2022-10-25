
import { login } from './selfServices/Auth';
import { Register } from './selfServices/Auth/register';
import { RegisterInstitution } from './selfServices/institution/register';

// get
import { Me } from "./selfServices/teachers/get/me"
import { ActivityLists } from "./selfServices/teachers/get/activitiesLists"
import { GetActivity } from "./selfServices/teachers/get/GetActivity"
import { imagesEditor } from "./selfServices/teachers/get/imgseditor"

// post
import { CreateActivity } from "./selfServices/teachers/post/createActivity"

// put
import { UpdateActivityList } from "./selfServices/teachers/put/updateActivityList"
import { UpdateLabels } from "./selfServices/teachers/put/updateLabel"
import { ResourcesActivity } from "./selfServices/teachers/put/resourcesActivity"




export const RemoteServices = {
    Login: {
        login,
        Register

    },
    Teachers:{
        Me,
        imagesEditor,
        ActivityLists,
        CreateActivity,
        GetActivity,
        UpdateActivityList,
        UpdateLabels,
        ResourcesActivity
    },
    Institution:{
        RegisterInstitution
    }
}