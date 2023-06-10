import {useAppSelector} from "../../../../store/hooks";
import OfferItem from "./offer-item";

export default function OfferList() {
    const offers = useAppSelector((state) => state.employer.me?.offers);
    const offeredPositions = (offers?.map(offer => offer.position) ?? [])
        .filter((position, index, array) => (
            !index || position.id !== array[index - 1].id
        ));

    return (
        <>
            {
                offeredPositions?.map(position => (
                    <OfferItem key={position.id} position={position}/>
                ))
            }
        </>
    )
}