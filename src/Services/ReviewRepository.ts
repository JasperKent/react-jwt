
import { BookReview } from "../Models/BookReview";
import config from '../Config.json'

class ReviewRepository{
    private async getReviewsCommon(path: string):Promise<BookReview[]> {
        const response = await fetch(`${config.serverUrl}/api/${path}`);

        if (response.status !== 200){
            throw new Error('Failed to retrieve data.')
        }

        return await response.json();   
    }

    async getReviews(): Promise<BookReview[]> {
        return await this.getReviewsCommon('BookReviews');
    }

    async getSummary(): Promise<BookReview[]> {
        return await this.getReviewsCommon('BookReviews/summary');
    }
}

export const reviewRepository = new ReviewRepository();