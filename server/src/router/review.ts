import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReview } from "../model/IReview";

const reviewService = new ReviewService();

export const reviewRouter = express.Router();

reviewRouter.post("/", async (
    req: Request<{}, {}, Omit<IReview, 'createdBy'>>,
    res: Response<String>
) => {
    try {
        if (req.session.user !== undefined) {
            await reviewService.createReview(req.body, req.session.user);
            res.status(200).send("Review created successfully.");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<IReview[] | string>
) => {
    try {
        if (req.session.user !== undefined) {
            console.log(req.session.user);
            const reviews = await reviewService.getReviews(req.session.user);
            res.status(200).send(reviews);
        } else {
            res.status(400).send("You are not logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/single/:reviewId", async (
    req: Request<{ reviewId: string }, {}, {}>,
    res: Response<IReview>
) => {
    try {
        const review = await reviewService.getReview(req.params.reviewId);
        res.status(200).send(review);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

reviewRouter.post("/answer", async (
    req: Request<{}, {}, { reviewId: string, answers: {questionId: string, answer: string}[]}>,
    res: Response<String>
) => {
    try {
        await reviewService.submitReview(req.body.reviewId, req.body.answers);
        res.status(200).send("Answers to review successfully submitted.");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});