import React, { useState } from 'react';

import Flat from '../../models/Flat';
import classes from './FlatItem.module.css';

const FlatItem: React.FC<{flatItem: Flat}> = (props) => {
    const { title, location, price, tags, imageUrls } = props.flatItem;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Set the index to the next image or the first one if the current image is the last
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    }

    // Set the index to the previous image or the last one if the current image is the first
    const previousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
    }

    return (
        <div className={classes.FlatItem}>
            <div className={classes.ImageCarousel}>
                <img
                    src={imageUrls[currentImageIndex]}
                    alt={title}
                    className={classes.FlatImage}
                />
                <button className={classes.PrevButton} onClick={previousImage}>
                    &lt;
                </button>
                <button className={classes.NextButton} onClick={nextImage}>
                    &gt;
                </button>
            </div>
            <div className={classes.FlatDetails}>
                <h2 className={classes.FlatTitle}>{title}</h2>
                <p className={classes.FlatLocation}> {location}</p>
                <p className={classes.FlatPrice}>Price: {price}</p>
                <div className={classes.FlatTags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={classes.Tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlatItem;