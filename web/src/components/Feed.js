import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"

import {useUser} from '../providers/user_context';

const Feed = () => {
    const [user, setUser] = useUser();
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
            navigate("/login")
        }
        
      });


    return (

        <h1>Feed</h1>
   
    
    );

//   function checkLogin(user){
//     if(!user){
//         navigation.navigate('/login')
//     }
//   }
};

export default Feed;