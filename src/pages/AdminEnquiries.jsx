import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';

export default function AdminEnquiries({ setCurrentPage }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentPage && setCurrentPage('admin-enquiries');
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/enquiries');
      setEnquiries(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch enquiries', err);
      setError(err.response?.data?.message || err.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Mark enquiry as '${status}'?`)) return;
    try {
      await api.put(`/enquiries/${id}/status`, { status });
      setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
      alert('Status updated');
    } catch (err) {
      console.error('Failed to update status', err);
      alert(err.response?.data?.message || err.message || 'Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      alert('Enquiry deleted');
    } catch (err) {
      console.error('Failed to delete enquiry', err);
      alert(err.response?.data?.message || err.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="p-6">Loading enquiries…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 to-red-50">
      <AdminSidebar currentPage="admin-enquiries" setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Enquiries</h2>
          <div>
            <button onClick={fetchEnquiries} className="px-4 py-2 bg-blue-600 text-white rounded">Refresh</button>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div>No enquiries found.</div>
        ) : (
          <div className="overflow-auto bg-white rounded-xl p-4 shadow">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Email</th>
                  <th className="px-2 py-2">Phone</th>
                  <th className="px-2 py-2">Message</th>
                  <th className="px-2 py-2">Property</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id} className="border-t align-top">
                    <td className="px-2 py-3">{e.name}</td>
                    <td className="px-2 py-3">{e.email}</td>
                    <td className="px-2 py-3">{e.phone}</td>
                    <td className="px-2 py-3 max-w-xs">{e.message}</td>
                    <td className="px-2 py-3">{e.propertyId?.title || '—'}</td>
                    <td className="px-2 py-3">{e.status || 'pending'}</td>
                    <td className="px-2 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(e._id, 'contacted')} className="px-2 py-1 bg-green-600 text-white rounded">Contacted</button>
                        <button onClick={() => updateStatus(e._id, 'closed')} className="px-2 py-1 bg-gray-600 text-white rounded">Close</button>
                        <button onClick={() => deleteEnquiry(e._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
