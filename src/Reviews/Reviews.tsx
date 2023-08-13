import { useEffect, useState } from "react";
import { reviewRepository } from "../Services/ReviewRepository";
import { BookReview } from "../Models/BookReview";

type Props = {
    style: 'all' | 'summary'
}

export const Reviews = ({style}: Props) => 
{
    const [reviews, setReviews] = useState([] as BookReview[]);
    const [errorMessage, setErrorMessage] = useState('Loading...');

    useEffect(()=>{
        async function getData(){
            try {            
                setErrorMessage('Loading...');

                setReviews(await (style === 'summary' ? reviewRepository.getSummary() : reviewRepository.getReviews()));

                setErrorMessage('');
            }
            catch (ex: any){
                setErrorMessage(ex.message ?? 'Unknown error.');
            }
        }

        getData();

    }, [style]);

    return (
        errorMessage ? 
            <p className="error">{errorMessage}</p>
            :
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.sort((l,r) => l.title.localeCompare(r.title)).map (r => 
                        <tr key={r.id}>
                            <td>{r.title}</td>
                            <td>{r.rating}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
}