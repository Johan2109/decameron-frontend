import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import HotelForm from "./HotelForm";
import Modal from "./Modal";
import "../css/HotelList.css";
import api from "../../api/axios";
import Swal from "sweetalert2";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const hotelsData = await api.get("/hotels");
      setHotels(hotelsData.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const toggleFormVisibility = (hotel = null) => {
    setShowForm((prev) => !prev);
    setEditingHotel(hotel);
  };

  const toggleHotelSelection = (hotel) => {
    setSelectedHotel((prev) => (prev?.id === hotel.id ? null : hotel));
  };

  const onHotelAdded = () => {
    fetchHotels();
    handleFormClose();
  };

  const handleFormClose = () => {
    setEditingHotel(null);
    setShowForm(false);
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      const confirmation = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Este cambio no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmation.isConfirmed) {
        const response = await api.delete(`/hotels/${hotelId}`);
        console.log(response.data);

        if (selectedHotel?.id === hotelId) {
          setSelectedHotel(null);
        }

        setHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.id !== hotelId)
        );

        Swal.fire(
          "¡Eliminado!",
          "El hotel ha sido eliminado correctamente.",
          "success"
        );
      } else {
        Swal.fire("Cancelado", "El hotel no fue eliminado", "info");
      }
    } catch (error) {
      console.error("Error al eliminar el hotel:", error);

      Swal.fire(
        "Error",
        "Hubo un error al intentar eliminar el hotel.",
        "error"
      );
    }
  };

  return (
    <div className="hotel-list-container">
      <header className="hotel-list-header">
        <div>
          <img src="https://www.decameron.com/images/logos/logo-decameron-all-inclusive.png" />
        </div>
        <div className="hotel-list-header-text">
          <h1>Lista de Hoteles</h1>
        </div>
      </header>
      <button
        className="add-hotel-button"
        onClick={() => toggleFormVisibility()}
      >
        {showForm ? "Cerrar Formulario" : "Agregar Hotel"}
      </button>

      {showForm && (
        <Modal onClose={handleFormClose}>
          <HotelForm editingHotel={editingHotel} onHotelAdded={onHotelAdded} />
        </Modal>
      )}

      <ul className="hotel-list">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className={`hotel-item ${
              selectedHotel?.id === hotel.id ? "selected" : ""
            }`}
            onClick={() => toggleHotelSelection(hotel)}
          >
            <div>
              <strong>{hotel.name}</strong> - <span>{hotel.city}</span>
            </div>
            <div className="hotel-buttons">
              <button
                className="edit-hotel-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFormVisibility(hotel);
                }}
              >
                Editar
              </button>
              <button
                className="delete-hotel-button"
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic se propague
                  handleDeleteHotel(hotel.id);
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedHotel && (
        <div className="room-list-container">
          <h2>Habitaciones de {selectedHotel.name}</h2>
          <RoomList hotelId={selectedHotel.id} />
        </div>
      )}
    </div>
  );
}

export default HotelList;
