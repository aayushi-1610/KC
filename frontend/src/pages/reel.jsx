import React, { useEffect, useRef, useState } from "react";
import video1 from "../assets/video1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";
import v5 from "../assets/v5.mp4";


const Reel = () => {
    const videoRefs = useRef([]);
    const [comments, setComments] = useState({});

    useEffect(() => {
        const handleVideoPlayback = () => {
            videoRefs.current.forEach((video) => {
                if (video) {
                    const rect = video.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
            });
        };

        window.addEventListener("scroll", handleVideoPlayback);
        window.addEventListener("load", handleVideoPlayback);

        return () => {
            window.removeEventListener("scroll", handleVideoPlayback);
            window.removeEventListener("load", handleVideoPlayback);
        };
    }, []);

    const handleLikeClick = (index) => {
        setComments((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                liked: !prev[index]?.liked,
            },
        }));
    };

    const handleCommentToggle = (index) => {
        setComments((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                showComments: !prev[index]?.showComments,
            },
        }));
    };

    const handleCommentSubmit = (event, index) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            setComments((prev) => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    list: [...(prev[index]?.list || []), event.target.value],
                },
            }));
            event.target.value = "";
        }
    };
    const videoData = [
        { src: video1 },  
        { src: v2 },      
        { src: v3 },      
        { src: v4 },      
        { src: v5 },      
        ];
    

    return (
        <div className="reel-container">
            {videoData.map((video, index) => (
                <div className="reel-wrapper" key={index}>
                    <video
                        className="reel"
                        src={video.src}
                        playsInline
                        ref={(el) => (videoRefs.current[index] = el)}
                    ></video>
                    <div className="controls">
                        <button
                            className={`btn like-btn ${comments[index]?.liked ? "liked" : ""}`}
                            onClick={() => handleLikeClick(index)}
                        >
                            ❤️ {comments[index]?.liked ? "Liked" : "Like"}
                        </button>
                        <button
                            className="btn comment-btn"
                            onClick={() => handleCommentToggle(index)}
                        >
                            💬 Comment
                        </button>
                    </div>
                    {comments[index]?.showComments && (
                        <div className="comment-section">
                            <input
                                type="text"
                                className="comment-input"
                                placeholder="Add a comment..."
                                onKeyPress={(e) => handleCommentSubmit(e, index)}
                            />
                            <ul className="comment-list">
                                {comments[index]?.list?.map((comment, i) => (
                                    <li key={i}>{comment}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            <style>{`
                .reel-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 400px;
                    margin: auto;
                }
                .reel-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 20px;
                    
                }
                .reel {
                margin-top:1rem;
                    width: 100%;
                    height: 500px;
                    border-radius: 10px;
                    background: black;
                    scroll-snap-align: center;
                }
                .controls {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 10px;
                }
                .btn {
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border: none;
                    border-radius: 5px;
                    transition: 0.3s;
                }
                .like-btn {
                    background-color: #ddd;
                }
                .like-btn.liked {
                    background-color: red;
                    color: white;
                }
                .comment-btn {
                    background-color: #007bff;
                    color: white;
                }
                .comment-section {
                    width: 300px;
                    margin-top: 10px;
                }
                .comment-input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .comment-list {
                    margin-top: 5px;
                    padding: 0;
                    list-style: none;
                }
                .comment-list li {
                    background: #fff;
                    padding: 5px;
                    margin: 2px 0;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default Reel;
