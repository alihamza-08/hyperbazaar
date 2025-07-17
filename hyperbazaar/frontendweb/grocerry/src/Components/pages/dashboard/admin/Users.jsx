
import React, { useEffect, useState } from 'react'
import { FaTrash, FaUser } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/getAllUser`, {
                method: "GET"
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error Occured during fetch user data ", error);
        }
    }

    const deleteUser = async (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this user?");
        if (!shouldDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/auth/getAllUser/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.error("Error occured during fetch user data ", error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div>
            <div className='flex items-center justify-around m-4 '>
                <h5 className='font-bold'>All Users</h5>
                <h5 className='font-bold '> Total User: {users.length} </h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md-w-[870px]">
                        {/* head */}
                        <thead className='bg-success text-white rounded-lg'>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {users.map((cur, index) => (
                                <tr key={index}>
                                    <td>{cur.username}</td>
                                    <td>{cur.email}</td>
                                    <td>{cur.phone}</td>
                                    <td>{cur.address}</td>
                                    <td>{
                                        cur.role === 'admin' ? "Admin" : (
                                            <button className='btn btn-xs btn-circle bg-indigo-500 text-white'><FaUser /> </button>
                                        )
                                    }</td>
                                    <td>
                                        <button className="btn btn-xs p-1 bg-[green] text-white btn-circle" onClick={() => deleteUser(cur._id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;
