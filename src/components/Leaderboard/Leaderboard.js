import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const Leaderboard = () => {
    
    const [leaderboard, setLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState();

    const showLeaderboard = () => {
        if (!leaderboard) {
            // fetch("http://localhost:3000/leaderboard")
            fetch("https://arcane-badlands-99768.herokuapp.com/leaderboard")
            .then(response => response.json())
            .then(users => {
                setLeaderboardData(users);
                setLeaderboard(true);
            })
            .catch(console.log);
            // console.log(leaderboardData);
        }
        setLeaderboard(false);
    };
    
    const getLastActive = (timestamp) => {
        const lastActive = new Date (timestamp);
        const now = new Date ();
        const unixDifference = now - lastActive;
        const minutesAgo = unixDifference / (1000*60);
        if (minutesAgo < 60) {
            if (minutesAgo.toFixed() <= 1) {
                return "just now"
            }
            return minutesAgo.toFixed() + " minutes ago"
        }
        else if (minutesAgo < 1440) {
            return (minutesAgo / 60).toFixed() + " hours ago";
        }
        else {
            return (minutesAgo / 60 / 24).toFixed() + " days ago";
            // return Math.floor(minutesAgo / 60 / 24);
        }
    };

    return (
        <div className="lboard">
            <p><span 
                onClick={showLeaderboard} 
                style={{cursor: "pointer"}} 
                className="link dim black underline pointer"
                >
                    Leaderboard
                </span></p>
            {
                leaderboard && (
                    <div className="lboard-bg shadow-2">
                        <FontAwesomeIcon 
                            icon={faWindowClose} 
                            className="btn-close-lboard"
                            onClick={showLeaderboard}
                            />
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: "30px"}}>#</th>
                                    <th>Name</th>
                                    <th style={{width: "50px"}}>Entries</th>
                                    <th>Last Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leaderboardData.map((user, i) => {
                                        return (
                                            <tr key={i}>
                                                <td style={{width: "30px"}}>{i+1}</td> 
                                                <td>{user.name}</td>
                                                <td style={{width: "50px"}}>{user.entries}</td>
                                                <td>{getLastActive(user.lastactive)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
};

export default Leaderboard;