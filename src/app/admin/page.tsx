'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Video {
  year: string;
  url: string;
}

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoYear, setVideoYear] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Retrieve the JWT token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchVideos = () => {
    if (!token) return;
    fetch("https://aom-app.onrender.com/api/video", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch videos");
        }
        return res.json();
      })
      .then((data: Video[]) => setVideos(data))
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      });
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
    fetchVideos();
  }, [router, token]);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoUrl || !videoYear) {
      setError("Please provide both URL and year.");
      return;
    }

    const newVideo = {
      year: videoYear,
      url: videoUrl,
    };

    fetch("https://aom-app.onrender.com/api/video", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newVideo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add video");
        }
        return res.json();
      })
      .then(() => {
        fetchVideos();
        setVideoUrl("");
        setVideoYear("");
        setError(null);
      })
      .catch((err) => {
        console.error("Error adding video:", err);
        setError("Failed to add video.");
      });
  };

  const handleDelete = (year: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the video from ${year}?`);
    if (!confirmed) return;

    fetch(`https://aom-app.onrender.com/api/video/${year}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete video");
        }
        fetchVideos();
      })
      .catch((err) => {
        console.error("Error deleting video:", err);
        setError("Failed to delete video.");
      });
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <h1 className="text-4xl text-white">Admin Page</h1>

      <div className="mt-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleAddVideo} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Year"
              value={videoYear}
              onChange={(e) => setVideoYear(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Video
          </button>
        </form>
      </div>

      <div className="mt-8">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
            <div>
              <p className="text-white">Year: {video.year}</p>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline"
              >
                {video.url}
              </a>
            </div>
            <button
              onClick={() => handleDelete(video.year)}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <a href="/" className="absolute top-4 right-4 text-white">
        Back to Welcome
      </a>
    </div>
  );
}
