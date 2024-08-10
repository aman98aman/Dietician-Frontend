import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip';

const CardFlip = ({ title, coverImage, content, bgImage }) => {
    const [isFlipped, setIsFlipped] = useState(false);


    const handleClick = (e) => {
        console.log('flipped')
        e.preventDefault();
        setIsFlipped(prevState => !prevState);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName="w-full h-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">

            <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950 ">
                <img src={coverImage} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                    <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
                    <p className="mb-4 text-gray-700 dark:text-slate-300 justify-between">
                        {content}                 </p>
                    <span onClick={handleClick} className="text-blue-500 cursor-pointer">Read More</span>
                </div>
            </div>

            <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950 h-full" onClick={handleClick}>
                <img src={bgImage} alt="Card" className="h-full w-full rounded-t-lg object-contain" />
            </div>

        </ReactCardFlip>
    )
}

export default CardFlip