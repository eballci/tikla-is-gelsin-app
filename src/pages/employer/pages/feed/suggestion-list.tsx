import {useAppSelector} from "../../../../store/hooks";
import SuggestionItem from "./suggestion-item";

export default function SuggestionList() {
    const suggestions = useAppSelector((state) => state.employer.me?.suggestions);
    const suggestedPositions = (suggestions?.map(suggestion => suggestion.position) ?? [])
        .sort((a, b) => (a.id - b.id))
        .filter((position, index, array) => (
            !index || position.id !== array[index - 1].id
        ));

    return (
        <>
            {
                suggestedPositions?.map(position => (
                    <SuggestionItem key={position.id} position={position}/>
                ))
            }
        </>
    )
}