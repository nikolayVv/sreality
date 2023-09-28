import {Flat, FlatAttributes} from '../models/models';

class FlatsService {
    // Find fixed number of flats in the database's table "flats" starting at defined starting index
    async findPerPage(startIndex: number, flatsPerPage: number): Promise<Flat[]> {
        return await Flat.findAll({
            offset: startIndex,
            limit: flatsPerPage,
        });
    }

    // Save a batch of flats in the database's table "flats"
    async saveBatch(flats: FlatAttributes[]): Promise<Flat[]> {
        return await Flat.bulkCreate(flats, { returning: true });
    }

    // Find the count of flats in the database's table "flats"
    async findAllCount(): Promise<number> {
        return await Flat.count();
    }
}

export default FlatsService;