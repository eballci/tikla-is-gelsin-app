import {useAppSelector} from "../../../../store/hooks";
import React from "react";
import SuggestionItem from "./suggestion-item";

export default function SuggestionList() {
    const suggestions = useAppSelector((state) => state.seeker.me?.suggestions);
    return (
        <>
            {
                suggestions?.map(suggestion => (
                    <SuggestionItem key={suggestion.id} suggestion={suggestion}></SuggestionItem>
                ))
            }
        </>
    )
}