import url from '../configs/axios';
import Flat from '../models/Flat';

class FlatService {
    private urlApi = 'flats';

    // Get fixed number of flats based on the start index
    public async getFlatsPerPage(startIndex: number, flatsPerPage: number): Promise<Flat[]> {
        try {
            const res = await url.get<Flat[]>(`${this.urlApi}?startIndex=${startIndex}&flatsPerPage=${flatsPerPage}`);
            return await res.data;
        } catch (e) {
            console.log("Couldn't get the flats: ", e);
            throw e;
        }
    }

    public async getFlatsCount(): Promise<number> {
        try {
            const res = await url.get<number>(`${this.urlApi}Count`);
            return await res.data;
        }  catch (e) {
            console.log("Couldn't get the count of flats: ", e);
            throw e;
        }
    }
}

export default FlatService;