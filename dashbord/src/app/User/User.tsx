"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const User = ({ data }) => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);


  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/booking/get/${data.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  
  const deleteUser = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/user/del/${data.id}`);
        console.log('User deleted successfully');
        router.replace(router.asPath);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>User Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.username}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td>
              <button className="deleteButton" onClick={deleteUser}>
                Delete User
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              {/* <td>{booking.PropertyId}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
