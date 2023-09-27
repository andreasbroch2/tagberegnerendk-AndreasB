// Component to display a youtube video that is lazyloaded and responsive

import { VideoJsonLd } from "next-seo"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function VideoComponent(props) {
    const [imageClicked, setImageClicked] = useState(false);
    const onThumbnailClick = () => {
        setImageClicked(true);
    };
    useEffect(() => {
        const playImg = document.querySelector("#play-button");
        if (!playImg) return;
        playImg.addEventListener("click", onThumbnailClick, { once: true });
    }, [])
    return (
        <>
            <VideoJsonLd
                name={props.title}
                description={props.description}
                embedUrl={`https://www.youtube.com/embed/${props.youtubeId}?rel=0&showinfo=0&autoplay=1`}
                uploadDate={props.date}
                thumbnailUrls={[`https://img.youtube.com/vi/${props.youtubeId}/sddefault.jpg`]}
            />
            <div className='relative video-post'>
                {!imageClicked ? (
                    <>
                        <Image
                            src={`https://img.youtube.com/vi/${props.youtubeId}/sddefault.jpg`}
                            fill
                            alt="yt thumbnail"
                            priority
                        />
                        <img className='play' id="play-button" src="http://addplaybuttontoimage.way4info.net/Images/Icons/7.png" alt="play button" />
                    </>
                ) : (
                    <iframe
                        allowFullScreen
                        src={
                            imageClicked
                                ? `https://www.youtube.com/embed/${props.youtubeId}?rel=0&showinfo=0&autoplay=1`
                                : ""
                        }
                        title="youtube video"
                    />
                )}
            </div>
        </>
    )
}