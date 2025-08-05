import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'

function AddWarehouse() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    capacity: '',
    delivery_charge: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    name: [],
    address: [],
    capacity: [],
    delivery_charge: []
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(form);
    try {
      const res = await axios.post('/warehouse/store', form);
      if (res.data.status) {
        navigate('/dashboard/warehouses');
      }
    }
    catch (err) {
      const errors = err.response?.data?.errors || {};
      setFormError({
        name: errors.name || [],
        address: errors.address || [],
         capacity: errors.capacity||[],
        delivery_charge: errors.delivery_charge||[]
      });
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-2/4 mx-auto mb-4 mt-10">
      <h3 className="font-bold text-xl mb-4">Add warehouse</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div className="p-2">
            {/* warehouse Name */}
            <div className="mb-3">
              <label htmlFor="name" className="text-[#374151]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
              />
              {formError.name.length > 0 && (
                <p className="text-red-500 text-sm mt-1">{formError.name[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="text-[#374151]">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
              />
              {formError.address.length > 0 && (
                <p className="text-red-500 text-sm mt-1">{formError.address[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="text-[#374151]">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
              />
              {formError.capacity.length > 0 && (
                <p className="text-red-500 text-sm mt-1">{formError.capacity[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="text-[#374151]">
                Delivery Charge
              </label>
              <input
                type="number"
                name="delivery_charge"
                value={form.delivery_charge}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
              />
              {formError.delivery_charge.length > 0 && (
                <p className="text-red-500 text-sm mt-1">{formError.delivery_charge[0]}</p>
              )}
            </div>



            <div>
              <input
                type="submit"
                value="Add"
                className="w-1/5 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer"
              />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>

        </div>
      </form>
    </div>
  );

}

export default AddWarehouse