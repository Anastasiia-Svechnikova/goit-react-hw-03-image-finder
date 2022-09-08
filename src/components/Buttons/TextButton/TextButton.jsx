import PropTypes from 'prop-types';
import s from './TextButton.module.css';


export const TextButton = ({onClick = null}) => {
    return (
        <button className={s.button} type='button' onClick={onClick}>
            Load more
        </button>
    )
}
TextButton.propTypes = {
    onClick: PropTypes.func
}
