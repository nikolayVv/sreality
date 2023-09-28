import React, {useContext, useEffect, useState} from 'react';

import { FlatsContext } from "../../store/flats-context";
import classes from './Pagination.module.css';

const Pagination: React.FC = () => {
    const flatsCtx = useContext(FlatsContext);

    const [totalPages, setTotalPages] = useState<number>(1);

    // Call it every 3 seconds until all 500 flats are in the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await flatsCtx.countFlats();

                if (!count || count === 0) {
                    setTotalPages(1);
                } else {
                    const newTotalPages = Math.ceil(count / flatsCtx.flatsPerPage);
                    if (totalPages !== newTotalPages) {
                        flatsCtx.loadFlats();
                    }
                    setTotalPages(newTotalPages);
                }

                if (count === 500) {
                    clearInterval(intervalId);
                }
            } catch (e) {
                setTotalPages(1);
                console.error('Error loading count of flats: ', e);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    // Change the page and load the new flats in the context
    const changePageHandler = async (page: number) => {
        await flatsCtx.changePage(page);
    };

    // Validate if the value of the input is actually a digit
    const validateInput = async (value: string) => {
        if (/^[0-9\b]+$/.test(value)) {
            await changePageHandler(parseInt(value, 10));
        }
    }

    return (
        <div className={classes.Pagination}>
            <div className={flatsCtx.currentPage === totalPages && totalPages === 1 ? classes.Loading : classes.Hide} >
                <span>Loading ...</span>
            </div>
            <button
                className={classes.PaginationBtn}
                disabled={flatsCtx.currentPage === 1}
                onClick={() => changePageHandler(1)}
            >
                First
            </button>
            <button
                className={classes.PaginationBtn}
                disabled={flatsCtx.currentPage === 1}
                onClick={() => changePageHandler(flatsCtx.currentPage - 1)}
            >
                Previous
            </button>
            <div className={flatsCtx.currentPage === totalPages && totalPages === 1 ? classes.Hide : classes.PaginationText}>
                <input
                    type="text"
                    className={classes.PaginationInput}
                    value={flatsCtx.currentPage}
                    onChange={(e) => validateInput(e.target.value)}
                />
                <span className={classes.Slash}>/</span>
                <span className={classes.TotalPages}>{totalPages}</span>
            </div>
            <button
                className={classes.PaginationBtn}
                disabled={flatsCtx.currentPage === totalPages}
                onClick={() => changePageHandler(flatsCtx.currentPage + 1)}
            >
                Next
            </button>
            <button
                className={classes.PaginationBtn}
                disabled={flatsCtx.currentPage === totalPages}
                onClick={() => changePageHandler(totalPages)}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;