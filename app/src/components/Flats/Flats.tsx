import React, {useContext, useEffect} from 'react';

import FlatItem from '../FlatItem/FlatItem';
import { FlatsContext } from '../../store/flats-context';
import classes from './Flats.module.css';

const Flats: React.FC = () => {
    const flatsCtx = useContext(FlatsContext);

    // Load the flats in the context
    useEffect(() => {
        flatsCtx.loadFlats();
    }, []);

    // TODO-> Change visually to show each flat in its window
    return (
        <div className={classes.FlatList}>
            {flatsCtx.flats.map(flat => (
                <FlatItem key={flat.id} flatItem={flat}/>
            ))}
        </div>
    );
}

export default Flats;