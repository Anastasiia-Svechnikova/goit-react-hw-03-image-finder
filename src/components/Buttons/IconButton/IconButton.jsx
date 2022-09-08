import PropTypes from 'prop-types';
import s from './IconButton.module.css';
import {BiSearch } from "react-icons/bi";


export const IconButton = ({onClick = null, type}) => {
    return (
        <button type={type} className={s.button}  onClick={onClick}>
            <BiSearch width="20" height="20" aria-label="search"/>
        </button>
    )
}
IconButton.propTypes = {
    onClick: PropTypes.func,
    type:PropTypes.string.isRequired,
}
