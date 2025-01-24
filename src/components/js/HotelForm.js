import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../css/HotelForm.css";
import api from "../../api/axios";
import Swal from "sweetalert2";

const FormInput = ({ label, ...inputProps }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input {...inputProps} required />
  </div>
);

function HotelForm({ onHotelAdded, editingHotel = null }) {
  const initialState = useMemo(
    () => ({
      name: editingHotel?.name || "",
      address: editingHotel?.address || "",
      city: editingHotel?.city || "",
      nit: editingHotel?.nit || "",
      numberRooms: editingHotel?.number_rooms || 1,
    }),
    [editingHotel]
  );

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      nit: formData.nit,
      number_rooms: formData.numberRooms,
    };

    try {
      if (editingHotel) {
        await updateHotel(hotelData);
      } else {
        await createHotel(hotelData);
      }
      onHotelAdded();
    } catch (error) {
      setError(error.response?.data?.message || "Ocurrió un error.");
    }
  };

  const updateHotel = async (hotelData) => {
    try {
      const response = await api.put(`/hotels/${editingHotel.id}`, hotelData);
      console.log(response.data);

      Swal.fire(
        "¡Actualizado!",
        "El hotel ha sido actualizado con éxito.",
        "success"
      );
    } catch (error) {
      if (error.response?.status === 422) {
        Swal.fire("Error", "Ya existe un hotel con ese nombre o NIT.", "error");
      } else {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Error al actualizar el hotel.",
          "error"
        );
      }
    }
  };

  const createHotel = async (hotelData) => {
    try {
      const response = await api.post("/hotels", hotelData);
      console.log(response.data);

      Swal.fire(
        "¡Agregado!",
        "El hotel ha sido agregado con éxito.",
        "success"
      );
    } catch (error) {
      if (error.response?.status === 422) {
        Swal.fire("Error", "Ya existe un hotel con ese nombre o NIT.", "error");
      } else {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Error al agregar el hotel.",
          "error"
        );
      }
    }
  };

  return (
    <div className="hotel-form-container">
      <h2>{editingHotel ? "Editar Hotel" : "Agregar Nuevo Hotel"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="hotel-form" onSubmit={handleSubmit}>
        <FormInput
          label="Nombre del Hotel"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          label="Dirección"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormInput
          label="Ciudad"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <FormInput
          label="NIT"
          type="text"
          name="nit"
          value={formData.nit}
          onChange={handleChange}
        />
        <FormInput
          label="Capacidad de Habitaciones"
          type="number"
          name="numberRooms"
          value={formData.numberRooms}
          onChange={handleChange}
          min="1"
        />
        <button className="submit-button" type="submit">
          {editingHotel ? "Actualizar Hotel" : "Agregar Hotel"}
        </button>
      </form>
    </div>
  );
}

export default HotelForm;
