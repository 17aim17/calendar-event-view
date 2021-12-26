import { Typography, IconButton, Modal, Card, CardMedia, CardContent, CardActions, Backdrop } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Slider from "react-slick";
import StarRating from './StarRating'
import TypeOfDay from './TypeOfDay'
import { getMonthNames } from './helpers'

export default ({ open, onClose, posts, postId, postOrder }) => {
    if (!posts[postId]) return null
    const monthNames = getMonthNames()
    postOrder = [...postOrder.reverse()];
    // console.log(postOrder);
    // console.log(postId);
    let initialSlide = 0;
    for (let i = 0; i < postOrder.length; i++) {
        if (postOrder[i] === postId) { initialSlide = i; break; }
    }
    // console.log("index " + initialSlide);
    let settings = {
        // initialSlide: initialSlide,
        dots: false,
        infinite: false,
        autoplay: false,
        swipeToSlide: true,
        arrows: true,
        speed: 1500,
        adaptiveHeight: true,
        className: 'modal',
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <ChevronRightIcon style={{ zIndex: 99 }} />,
        prevArrow: <ChevronLeftIcon style={{ zIndex: 99 }} />,
        // rtl: true
    };

    return (
        <Backdrop open={open} style={{ zIndex: 99, width: '100%', backgroundColor: '#000000f2' }}>
            {/* <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"

        > */}
            <IconButton onClick={onClose} className='closeBtn' style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: '999',
                border: "1px solid #fff"
            }}
                color="primary"
            >
                <CloseIcon />
            </IconButton>
            <Slider {...settings}>
                {postOrder.map((pid) => {
                    return (
                        <div key={pid}>
                            <Card className='root' >
                                <CardMedia className='media' image={posts[pid].media[0].mediaurl} />
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                        <TypeOfDay typeofday={posts[pid].typeofday} />
                                        <StarRating rating={posts[pid].rating} />
                                    </div>
                                    <Typography component="span" variant="subtitle1" color='primary' >
                                        {new Date(posts[pid].calendardatetime).getUTCDate()} {monthNames[new Date(posts[pid].calendardatetime).getUTCMonth()]}
                                    </Typography>

                                    <pre style={{ fontFamily: 'inherit', margin: 0, }}>
                                        <span>{posts[pid].text}</span>
                                    </pre>

                                </CardContent>
                                <CardActions className="actions">
                                    <Typography component="p" variant="subtitle2" display="block" align='center'>View Full Post
                                    </Typography>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })}
                {/* {post && postId &&

                } */}

            </Slider>

            {/* </Modal> */}
        </Backdrop >
    )
}