import React, { useState, useEffect, useCallback } from "react";

import RoomForm from "./RoomForm";
import "../css/RoomList.css";
import api from "../../api/axios";

function RoomList({ hotelId }) {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const roomsData = await api.get(`/hotels/${hotelId}/rooms`);
      setRooms(
        Array.isArray(roomsData.data)
          ? roomsData.data
          : roomsData.data.rooms || []
      );
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const closeForm = () => {
    setShowForm(false); 
  };

  return (
    <div className="room-list-container">
      <header className="room-list-header">
        <h3>Lista de Habitaciones</h3>
        <button className="add-room-button" onClick={toggleFormVisibility}>
          {showForm ? "Cerrar Formulario" : "Agregar Habitación"}
        </button>
      </header>
      
      {showForm && <RoomForm hotelId={hotelId} onRoomAdded={fetchRooms} closeForm={closeForm} />}

      {rooms.length > 0 ? (
        <ul className="room-list">
          {rooms.map((room) => (
            <li key={room.id} className="room-item">
              <div className="room-info">
                <strong>Tipo:</strong> {room.room_type}
              </div>
              <div className="room-info">
                <strong>Acomodación:</strong> {room.accommodation}
              </div>
              <div className="room-info">
                <strong>Cantidad:</strong> {room.amount}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay habitaciones</p>
      )}
    </div>
  );
}

export default RoomList;
