import {useAppSelector} from "../../../../store/hooks";
import OfferItem from "./offer-item";
import {OfferSubmissionStatus} from "../../../../model";

export default function OfferList() {
    const offers = useAppSelector((state) => state.seeker.me?.offers)
        ?.filter(offer => offer.status < OfferSubmissionStatus.REFUSED);

    return (
        <>
            {
                offers?.map(offer => (
                    <OfferItem key={offer.id} offer={offer}></OfferItem>
                ))
            }
        </>
    )
}