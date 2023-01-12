import { ButtonStyle } from "./Button.styles"
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
    return (
        <ButtonStyle type="button" onClick={()=>{onClick()}}>Load More</ButtonStyle>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}