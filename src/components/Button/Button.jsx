import { ButtonStyle } from "./Button.styles"

export const Button = ({ onClick }) => {
    return (
        <ButtonStyle type="button" onClick={()=>{onClick()}}>Load More</ButtonStyle>
    )
}