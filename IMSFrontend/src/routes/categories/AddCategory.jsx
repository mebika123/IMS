import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'
const AddCategory = () => {
  const [form, setForm] = useState({
    name: '',
    active: false
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formError, setFormError] = useState({
    name: [],
    active: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post('/category/store', form);
      if (res.data.status) {
        setSuccess('Category added successfully!');
        setTimeout(() => {
          navigate('/dashboard/categories');
        }, 1000);
      }
    } catch (err) {
      const errors = err.response?.data?.errors || {};
      setFormError({
        name: errors.name || [],
        active: errors.active || []
      });
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-2/4 mx-auto mb-4 mt-10">
      <h3 className="font-bold text-xl mb-4">Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          {/* Category Name */}
          <div className="mb-3">
            <label htmlFor="name" className="text-[#374151]">
              Category Name
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

          {/* Is Active */}
          <div className="mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="align-middle"
            />
            <label htmlFor="active" className="text-[#374151]">
              Is Active
            </label>
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
      </form>
    </div>
  );
};

export default AddCategory;
