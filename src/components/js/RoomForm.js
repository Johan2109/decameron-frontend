import React, { useState } from "react";
import "../css/RoomForm.css";
import api from "../../api/axios";
import Swal from "sweetalert2";

function RoomForm({ hotelId, onRoomAdded, closeForm }) {
  const [formState, setFormState] = useState({
    roomType: "",
    accommodation: "",
    amount: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      id_hotel: hotelId,
      room_type: formState.roomType,
      accommodation: formState.accommodation,
      amount: formState.amount,
    };

    try {
      const response = await api.post(`/rooms`, roomData);
      console.log(response.data);
      closeForm();
      onRoomAdded();

      Swal.fire({
        title: "¡Éxito!",
        text: "La habitación ha sido agregada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Combinación no válida de tipo de habitación y alojamiento.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });

      console.error("Error al agregar la habitación:");
    }
  };

  const renderAccommodationOptions = (roomType) => {
    switch (roomType) {
      case "ESTANDAR":
        return (
          <>
            <option value="SENCILLA">Sencilla</option>
            <option value="DOBLE">Doble</option>
          </>
        );
      case "JUNIOR":
        return (
          <>
            <option value="TRIPLE">Triple</option>
            <option value="CUADRUPLE">Cuádruple</option>
          </>
        );
      case "SUITE":
        return (
          <>
            <option value="SENCILLA">Sencilla</option>
            <option value="DOBLE">Doble</option>
            <option value="TRIPLE">Triple</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="room-form-container">
      <h3>Agregar Habitación</h3>
      <form className="room-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Habitación:</label>
          <select
            name="roomType"
            value={formState.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="ESTANDAR">Estándar</option>
            <option value="JUNIOR">Junior</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>

        <div className="form-group">
          <label>Acomodación:</label>
          <select
            name="accommodation"
            value={formState.accommodation}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una acomodación</option>
            {renderAccommodationOptions(formState.roomType)}
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            name="amount"
            value={formState.amount}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Agregar Habitación
        </button>
      </form>
    </div>
  );
}

export default RoomForm;
