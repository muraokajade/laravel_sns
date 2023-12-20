// resources/js/Pages/Users/Index.jsx

import React from "react";

const Index = ({ users }) => {
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
