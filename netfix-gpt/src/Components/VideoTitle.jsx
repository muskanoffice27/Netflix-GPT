const VideoTitle = ({title,overview}) => {
    return(
    <div className="w-screen aspect-video pt-[20%] px-24 text-white absolute bg-gradient-to-r from-black">
       <h1 className="text-3xl font-bold py-2">{title}</h1>
       <p className="text-lg w-1/3">{overview}</p>
       <div className="my-4">
        <button className="text-white bg-black px-6 py-3 opacity-70 rounded-lg hover:bg-opacity-70" >Play</button>
        <button className="text-white bg-black px-6 py-3 opacity-70 rounded-lg mx-2">More Info</button>
       </div>
    </div>
   )
}
export default VideoTitle;