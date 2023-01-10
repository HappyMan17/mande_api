
import {getUserByEmailAndPhoneNumber} from '../service/userService.js'

const authByEmailPwd = (email, phone_number) => {
    const user2 = getUserByEmailAndPhoneNumber(req,res)

    if (!user2) throw new Error();
    if (user2.phone_number !== phone_number) throw new Error();
    return user2;
    
};

export default authByEmailPwd;