import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({image, tags = 'nice picture'}) => {
    return (
        <li className={s.item}>
            <img className={s.image} src={image} alt={tags} />
        </li>
    )
}
ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string
}