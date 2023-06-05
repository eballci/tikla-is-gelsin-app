import {useAppSelector} from "../../../../store/hooks";
import PositionItem from "./position-item";

export default function PositionList() {
    const positions = useAppSelector((state) => state.employer.me?.openPositions);

    return (
        <>
            {
                positions?.map(position => (
                    <PositionItem position={position}/>
                ))
            }
        </>
    );
}