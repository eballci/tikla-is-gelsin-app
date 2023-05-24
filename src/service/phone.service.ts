import {Phone} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const createPhone = async (seekerId: number, phone: Phone): Promise<boolean> => {
    try {
        await axios.post(
            `${apiUrl}/phone/`,
            {
                ...phone,
                seekerId
            }
        );
        return true;
    } catch (exception) {
        return false;
    }
};

export const updatePhone = async (phone: Phone): Promise<boolean> => {
    try {
        await axios.patch(
            `${apiUrl}/phone/`,
            {
                ...phone,
                phoneId: phone.id
            }
        );
        return true;
    } catch (exception) {
        return false;
    }
};

export const removePhone = async (phone: Phone): Promise<boolean> => {
    try {
        await axios.delete(
            `${apiUrl}/phone/${phone.id}`
        )
        return true;
    } catch (exception) {
        return false;
    }
}