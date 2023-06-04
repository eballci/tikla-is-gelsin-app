import {useAppSelector} from "../../../../store/hooks";
import {Positions} from "../../../../data/presetData";

export default function PositionList() {
    const positions = useAppSelector((state) => state.employer.me?.openPositions);

    return (
        <>
            {
                positions?.map(position => (
                    <li>{Positions.filter((p) => p.value === position.title)[0].visual}</li>
                ))
            }
        </>
    );
}