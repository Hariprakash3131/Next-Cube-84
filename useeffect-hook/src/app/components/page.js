"use client";

import { useEffect, useState } from "react";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

  }, []);

  return (
    <div>

      <h1>User List</h1>

      {
        users.map((user) => (
          <h2 key={user.id}>
            {user.name}
          </h2>
        ))
      }

    </div>
  );
}