import { answerModel } from "../db/answer.db";
import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";

export class ReviewService {
    async createReview(review: IReview) {
        console.log(review.review[0].questions);
        reviewModel.create({
            username: review.username,
            review: review.review
        });
    }

    async getReview(reviewId: string): Promise<IReview | undefined> {
        try {
            const review = await reviewModel.findOne({ _id: reviewId }).exec();
            if (review !== null) { // since findById returns null if no document is found
                return review.toObject();
            }
        } catch (error) {
            console.error('An error occurred while fetching the review:', error);
            // Handle the error appropriately
        }

        throw new Error("No review was found with id: " + reviewId);
    }

    async submitReview(questionId: string, answer: string) {
        try {
            const answers = await this.getAnswers(questionId) ?? [];

            const result = await answerModel.findOneAndUpdate(
                { questionId: questionId },
                {
                    answers: [...answers, answer]
                },
                {
                    upsert: true,
                    new: true
                }).exec();

            console.log(result);
        } catch (error) {
            console.error('An error occured while updating the database: ', error);
            throw new Error('An error occured while updating the database: ' + error);
        }
    }

    private async getAnswers(questionId: string): Promise<string[] | undefined> {
        try {
            const result = await answerModel.findOne({ questionId: questionId }).exec();

            if (result) {
                return result.answers
            } else {
                console.log("Could not find question with questionID: " + questionId);
            }
        } catch (error) {
            console.log("Error occured when fetching answers", error);
        }

    }
}