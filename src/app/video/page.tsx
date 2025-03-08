'use client'
import { useEffect, useState } from "react";
import VideoThumbnail from "@/app/video/components/VideoThumbnail";

type Video = {
  year: string;
  url: string;
};

type VideosByYear = Record<string, Video[]>;

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("https://aom-app.onrender.com/api/video")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const videosByYear: VideosByYear = videos.reduce((acc: VideosByYear, video) => {
    if (!acc[video.year]) {
      acc[video.year] = [];
    }
    acc[video.year].push(video);
    return acc;
  }, {});

  return (
    <div className="relative bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-bold text-center pt-10">Aom</h1>
      <hr className="my-4 border-white w-1/2 mx-auto" />

      {Object.entries(videosByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, videos]) => (
          <div key={year}>
            <h2 className="text-3xl font-semibold text-center mt-8">{year}</h2>
            <div className="flex justify-center gap-6 mt-6 flex-wrap">
              {videos.map((video, index) => (
                <VideoThumbnail key={index} year={video.year} url={video.url}/>
              ))}
            </div>
          </div>
        ))}

        <a href="/" className="absolute top-4 right-4 text-white">
          Back to Welcome
        </a>
    </div>
  );
}
