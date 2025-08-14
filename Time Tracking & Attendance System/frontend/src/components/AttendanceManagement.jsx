import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from '../context/AuthContext';

const AttendanceManagement = () => {
  const { user } = useAuth(); // get logged-in user info (should have token)
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    checkInTime: "",
    checkOutTime: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const res = await axiosInstance.get("/api/attendance", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setAttendance(res.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/api/employees", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Create / Update
  const saveAttendance = async () => {
    if (!formData.employeeId || !formData.checkInTime) {
      alert("Please select Employee and provide Check-In Time");
      return;
    }
    try {
      if (editingId) {
        await axiosInstance.put(`/api/attendance/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setEditingId(null);
      } else {
        await axiosInstance.post("/api/attendance", formData, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
      }
      resetForm();
      fetchAttendance();
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  // Delete
  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axiosInstance.delete(`/api/attendance/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchAttendance();
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  // Edit
  const editAttendance = (record) => {
    setFormData({
      employeeId: record.employee?._id || "",
      date: record.date?.split("T")[0] || "",
      checkInTime: record.checkInTime || "",
      checkOutTime: record.checkOutTime || "",
    });
    setEditingId(record._id);
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      date: "",
      checkInTime: "",
      checkOutTime: "",
    });
  };

  useEffect(() => {
    if (user?.token) {
      fetchAttendance();
      fetchEmployees();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-12">Attendance Management</h2>

      {/* Form */}
      <div className="bg-white shadow p-4 rounded mb-6 flex flex-wrap gap-2">
        <select
          className="border p-2 rounded min-w-[180px]"
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.role})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />

        <input
          type="time"
          className="border p-2 rounded"
          value={formData.checkInTime}
          onChange={(e) =>
            setFormData({ ...formData, checkInTime: e.target.value })
          }
        />

        <input
          type="time"
          className="border p-2 rounded"
          value={formData.checkOutTime}
          onChange={(e) =>
            setFormData({ ...formData, checkOutTime: e.target.value })
          }
        />

        <button
          onClick={saveAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              resetForm();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Check In</th>
              <th className="p-2 border">Check Out</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((att) => (
              <tr key={att._id} className="hover:bg-gray-50">
                <td className="p-2 border">{att.employee?.name}</td>
                <td className="p-2 border">
                  {att.date?.split("T")[0] || "—"}
                </td>
                <td className="p-2 border">{att.checkInTime || "—"}</td>
                <td className="p-2 border">{att.checkOutTime || "—"}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => editAttendance(att)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAttendance(att._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {attendance.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManagement;
