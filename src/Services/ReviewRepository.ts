
import { BookReview } from "../Models/BookReview";
import config from '../Config.json'
import axios from "axios";

class ReviewRepository{
    private async getReviewsCommon(path: string):Promise<BookReview[]> {
        const response = await axios.get<BookReview[]>(`${config.serverUrl}/api/${path}`);

        if (response.status !== 200){
            throw new Error('Failed to retrieve data.')
        }

        return response.data;   
    }

    async getReviews(): Promise<BookReview[]> {
        return await this.getReviewsCommon('BookReviews');
    }

    async getSummary(): Promise<BookReview[]> {
        return await this.getReviewsCommon('BookReviews/summary');
    }
}

export const reviewRepository = new ReviewRepository();