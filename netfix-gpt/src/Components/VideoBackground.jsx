import useMovieTrailer from '../Hooks/useMovieTrailer';
import { useSelector } from 'react-redux';


const VideoBackground = ({movieId}) => {
     const trailerId = useSelector((store)=> store.movies?.trailerVideo)
     useMovieTrailer(movieId);
     return(
        <div className="w-screen"> 
        <iframe className="w-screen aspect-video" src={"https://www.youtube.com/embed/8TZMtslA3UY?si="+ trailerId?.key+"?autoplay=1&mute=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    )
}
export default VideoBackground;