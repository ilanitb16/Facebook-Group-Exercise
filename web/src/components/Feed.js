import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {useUser} from '../providers/user_context';

const Feed = () => {
    const [user, setUser] = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User", user);

        if(!user?.authenticated){
            navigate("/login")
        }
    });


    return (
        <h1>Feed</h1>
    );
};

export default Feed;