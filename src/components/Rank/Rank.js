import React from "react";

const Rank = ({name, entries, faces}) => {
    return (
        <div className="container-rank">
            <h4 className="white">This Magic Brain will detect faces in your pictures. Give it a try.</h4>
            <p className="white">Hello {name},</p>
            <p className="white">
                {entries === 0 || faces === 0 ? 
                `Drag-and-drop or copy-paste an image or url to get started. No images were uploaded this session yet. `
                :
                `Great job detecting ${faces === 1 ? "a face" : faces+" faces"}, keep it up and advance in the leaderboard!`
                }
            </p>
            <p className="white">
                <span className="f3">
                    {entries}
                </span>
                    {` faces were detected in total.`} 
            </p>
        </div>
    );
};

export default Rank;