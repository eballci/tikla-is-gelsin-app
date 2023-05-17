import {VisitEmployer} from "../model";
import axios from "axios";

export const visitEmployer = async (id: number): Promise<VisitEmployer> => {
    try {
        const response = await axios.get(`http://localhost:8080/employer/${id}`);
        const data = response.data;

        return <VisitEmployer> data;

    } catch (exception) {
        throw new Error("The requested employer couldn't found");
    }
}