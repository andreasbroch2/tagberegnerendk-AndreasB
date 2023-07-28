"use client";

import { useState } from "react";

export default function UI({ addHobby }) {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState();
    //Handle promise return from addHJobby function
    const handleSetUser = () => {
        addHobby().then((res) => setUser(res));
    };

    return (
        <>
            <h1>{user.userName}</h1>
            <button onClick={handleSetUser}>Set Username</button>
        </>
    );
}
