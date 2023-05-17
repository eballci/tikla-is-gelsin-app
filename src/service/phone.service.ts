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
};

export const updatePhone = async (phone: Phone): Promise<boolean> => {
    try {
        await axios.patch(
            "http://localhost:8080/phone/",
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
            `http://localhost:8080/phone/${phone.id}`
        )
        return true;
    } catch (exception) {
        return false;
    }
}