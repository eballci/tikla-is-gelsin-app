import {useAppSelector} from "../../../../store/hooks";
import SubmissionItem from "./submission-item";

export default function SubmissionList() {
    const submissions = useAppSelector((state) => state.employer.me?.submissions)
        ?.filter(submission => submission.status < 3)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const submittedPositions = (submissions?.map(submission => submission.position) ?? [])
        .filter((position, index, array) => (
            !index || position.id !== array[index - 1].id
        ));

    return (
        <>
            {
                submittedPositions?.map(position => (
                    <SubmissionItem key={position.id} position={position}/>
                ))
            }
        </>
    )
}