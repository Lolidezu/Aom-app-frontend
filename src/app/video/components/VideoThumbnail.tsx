"use client";

import { useState } from "react";

interface VideoThumbnailProps {
  year: string;
  url: string; 
}

export default function VideoThumbnail({ year, url }: VideoThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);


  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  const videoId = match ? match[1] : null;


  const getDriveThumbnail = (driveUrl: string) => {
    const match = driveUrl.match(/\/d\/(.+?)\//); 
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : "/default-thumbnail.jpg";
  };
  
  // Usage
  const thumbnailUrl = getDriveThumbnail(url);

  const handleThumbnailClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative flex justify-center items-center p-1 bg-white rounded-lg">
        <button onClick={handleThumbnailClick}>
          <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover rounded-lg" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-50">
          <div className="bg-slate-800 p-2 rounded-md relative">
            <iframe
              src={`https://drive.google.com/file/d/${videoId}/preview`}
              width="640"
              height="360"
              allow="autoplay"
            ></iframe>
          </div>

          <button
            className="px-6 py-3 mt-10 bg-slate-950/30 border-2 border-blue-300/60 text-white text-lg hover:bg-slate-700/30 transition duration-200"
            onClick={handleClose}
          >
            Close Video
          </button>
        </div>
      )}
    </div>
  );
}
