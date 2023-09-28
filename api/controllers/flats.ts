import { Request, Response } from "express";
import FlatsService from "../services/flat.service";

const service = new FlatsService();

// Get fixed number of flats depending on
// the value of the query "startIndex" or by default 0
// the value of the query "flatsPerPage" or by default 10
const getFlatsPerPage = async (req: Request, res: Response) => {
    try {
        const startIndex = parseInt(req.query.startIndex as string, 10) || 0;
        const flatsPerPage = parseInt(req.query.flatsPerPage as string, 10) || 10;

        const flats = await service.findPerPage(startIndex, flatsPerPage);
        if (!flats) {
            res.status(404).json({
                message: "Couldn't find any flats in the database!"
            })
        } else {
            res.status(200).json(flats);
        }
    } catch (e) {
        res.status(500).json(e);
    }
};

// Get count of all flats
const getFlatsCount = async (req: Request, res: Response) => {
    try {
        const flatsCount = await service.findAllCount();

        res.status(200).json(flatsCount);
    } catch (e) {
        res.status(500).json(e);
    }
};


export { getFlatsPerPage, getFlatsCount };