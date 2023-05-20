import {useAppSelector} from "../../../../store/hooks";
import SubmissionItem from "./submission-item";

export default function SubmissionList() {
    const submissions = useAppSelector((state) => state.seeker.me?.submissions);

    return (
        <>
            {
                submissions?.map(submission => (
                    <SubmissionItem key={submission.id} submission={submission}/>
                ))
            }
        </>
    );
}