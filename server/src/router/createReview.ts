import express, { Request, Response } from "express";
import { GithubRepository } from "../service/GithubRepository";

const fetchCodeService = new GithubRepository();

export const createReviewRouter = express.Router();

createReviewRouter.get("/", async (
    req: Request<{}, {}, {path: string}>, // Expecting a query parameter named 'path' of type string
    res: Response<String>
) => {
    try {
        console.log("user: " + req.session.user)
        if(req.session.user === undefined)
            
        if(typeof(req.query.path) !== "string") {
            res.status(400).send(`Bad GET call to ${req.originalUrl} --- at least one of the urls provided is not a string`)
        }
        const fetchedCode = await fetchCodeService.fetchCode(req.query.path as string);

        res.status(200).send(fetchedCode)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})