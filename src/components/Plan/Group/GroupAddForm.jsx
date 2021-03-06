import React, { useState } from 'react';
import { addGuests, deleteGuest } from '../../../services/guests';
import { useTrips } from '../../../hooks/useTrips';
import { getTripsById } from '../../../services/trips';
import './group.css';

export default function GroupAddForm() {
  const { trips, loading, setTrips } = useTrips();
  const tripsId = trips.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGuests(name, email, phoneNumber, emergencyContact, tripsId);
    const data = await getTripsById(tripsId);
    setTrips(data);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setEmergencyContact('');
  };

  const handleClick = async (id) => {
    await deleteGuest(id);
    const data = await getTripsById(tripsId);
    setTrips(data);
  };
  if (loading) return <p>loading</p>;
  return (
    <>
      <div>
        {trips.guests.map((guest) => {
          return (
            <div className="guestlist" key={guest.guest_id}>
              <p className="guest-info">
                Name: <p className="details">{guest.name}</p>
              </p>
              <p className="guest-info">
                Email: <p className="details">{guest.email}</p>
              </p>
              <p className="guest-info">
                Phone Number: <p className="details">{guest.phone_number}</p>
              </p>
              <p className="guest-info">
                Emergency Contact:
                <p className="details">{guest.emergency_contact}</p>
              </p>
              <button
                className="delete-button"
                onClick={() => handleClick(guest.guest_id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <form className="groupform">
        <input
          placeholder="First Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Phone Number"
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <input
          placeholder="emergency Contact"
          type="text"
          value={emergencyContact}
          onChange={(e) => {
            setEmergencyContact(e.target.value);
          }}
        />
      </form>
      <div>
        <button className="button2" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </>
  );
}
