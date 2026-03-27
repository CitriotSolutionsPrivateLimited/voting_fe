import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import axios from "../../utils/axios";
import { INDIA_DATA } from "../data/indiadata";

const SearchElectoral = () => {
  const [form, setForm] = useState({
    state: "",
    district: "",
    constituency: "",
    name: "",
    relativeName: "",
    dob: ""
  });

  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleDistrictChange = (e) => {
    setForm({
      ...form,
      district: e.target.value,
      constituency: ""
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // ✅ prevent empty search
    if (
        !form.state &&
        !form.district &&
        !form.constituency &&
        !form.name &&
        !form.relativeName &&
        !form.dob
    ) {
        alert("Please enter at least one search field");
        return;
    }

    try {
        const res = await axios.post("search-voter", form);
        setData(res.data);
        setSearched(true);
    } catch (err) {
        console.error(err);
        setSearched(true);
    }
    };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="p-6">

        {/* ✅ Breadcrumb */}
        <div className="text-sm mb-3 flex gap-2 items-center">
          <Link to="/home" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-700">
            Search Electoral
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Search in Electoral Roll
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-md grid grid-cols-3 gap-4"
        >
          <select
            name="state"
            value={form.state}
            onChange={(e) =>
                setForm({ ...form, state: e.target.value, district: "", constituency: "" })
            }
            >
            <option value="">Select State</option>
            {Object.keys(INDIA_DATA).map((state) => (
                <option key={state} value={state}>
                {state}
                </option>
            ))}
            </select>

          <select
            name="district"
            value={form.district}
            onChange={(e) =>
                setForm({ ...form, district: e.target.value, constituency: "" })
            }
            disabled={!form.state}
            >
            <option value="">Select District</option>
            {form.state &&
                Object.keys(INDIA_DATA[form.state]).map((district) => (
                <option key={district} value={district}>
                    {district}
                </option>
                ))}
            </select>

          <select
                name="constituency"
                value={form.constituency}
                onChange={handleChange}
                disabled={!form.district}
                >
                <option value="">Select Constituency</option>
                {form.state &&
                    form.district &&
                    INDIA_DATA[form.state][form.district].map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                    ))}
                </select>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="relativeName"
            placeholder="Relative Name"
            value={form.relativeName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="col-span-3 bg-slate-800 text-white py-2 rounded"
          >
            Search
          </button>
        </form>

        {/* ❌ No Data */}
        {searched && data.length === 0 && (
          <div className="mt-6 bg-white p-6 rounded shadow text-center text-gray-600">
            No voter found
          </div>
        )}

        {/* ✅ Table */}
        {data.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded shadow-md overflow-auto">
            <table className="w-full text-sm border">
              <thead className="bg-slate-200">
                <tr>
                  <th>S.No</th>
                  <th>EPIC</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Relative</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Constituency</th>
                  <th>Part</th>
                  <th>Polling</th>
                  <th>Serial</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-center border-t">
                    <td>{index + 1}</td>
                    <td>{item.epicNumber}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.relativeName}</td>
                    <td>{item.state}</td>
                    <td>{item.district}</td>
                    <td>{item.constituency}</td>
                    <td>{item.part}</td>
                    <td>{item.pollingStation}</td>
                    <td>{item.serialNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchElectoral;