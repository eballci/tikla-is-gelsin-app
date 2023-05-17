import {Phone} from "../model";
import axios from "axios";

export const createPhone = async (phone: Phone): Promise<boolean> => {
    try {
        await axios.post(
            "http://localhost:8080/phone/",
            {
                ...phone,
                seekerId: phone.id
            }
        );
        return true;
    } catch (exception) {
        return false;
    }
}