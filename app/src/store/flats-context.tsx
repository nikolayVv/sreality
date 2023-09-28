import React, { useState } from 'react';

import Flat from '../models/Flat';
import FlatService from "../services/flat.service";

interface Props {
    children: React.ReactNode;
}

type FlatsContextObj = {
    flats: Flat[];
    currentPage: number;
    flatsPerPage: number;
    loadFlats: (page?: number) => void;
    changePage: (page: number) => void;
    countFlats: () => Promise<number>;
};

export const FlatsContext = React.createContext<FlatsContextObj>({
    flats: [],
    currentPage: 1,
    flatsPerPage: 8,
    loadFlats: async () => {},
    changePage: async () => {},
    countFlats: async () => 0,
});

const FlatsContextProvider: React.FC<Props> = ({ children }) => {
    const [flats, setFlats] = useState<Flat[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const flatsPerPage = 8;

    const service = new FlatService();

    // Load the flats depending on the starting index (current page and flats per page) and flats per page
    const loadFlatsHandler = async (page?: number) => {
        try {
            if (!page) {
                page = currentPage;
            }
            const startIndex = (page - 1) * flatsPerPage;
            const loadedFlats: Flat[] = await service.getFlatsPerPage(startIndex, flatsPerPage);
            setFlats(loadedFlats);
        } catch (e) {
            console.error("Couldn't load flats: ", e);
        }
    };

    // Change the current page and load the flats on the new page
    // Set to 1 if the new page is smaller than 1
    // Set to number of all pages if new page is bigger than the number of all pages
    const changePageHandler = async (page: number) => {
        const totalFlats = await countFlatsHandler();
        const totalPages = Math.ceil(totalFlats / flatsPerPage);

        let newPage = page
        if (newPage < 1) {
            newPage = 1;
        } else if (newPage > totalPages) {
            newPage = totalPages;
        }
        setCurrentPage(newPage);

        await loadFlatsHandler(newPage);
    };

    const countFlatsHandler = async () => {
        return await service.getFlatsCount();
    };

    const contextValue: FlatsContextObj = {
        flats,
        currentPage,
        flatsPerPage,
        loadFlats: loadFlatsHandler,
        changePage: changePageHandler,
        countFlats: countFlatsHandler,
    };

    return <FlatsContext.Provider value={contextValue}>
        {children}
    </FlatsContext.Provider>
}

export default FlatsContextProvider;