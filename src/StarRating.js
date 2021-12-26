import { Rating } from 'react-simple-star-rating'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default ({ rating }) => {
    const theme = useTheme();

    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const xsSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    let size = 20
    if (xs) {
        size = 10
    } else if (xsSm) {
        size = 15
    }
    return (
        <Rating readonly fillColor={"#60a5fa"} iconsCount={5} size={size} initialValue={rating} />
    )
}