import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";

const TheaterRequests = () => {
  const { axios, getToken } = useAppContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const getHeaders = useCallback(async () => ({
    Authorization: `Bearer ${await getToken()}`,
  }), [getToken]);

  const fetchRequests = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/admin/theater-requests", {
        headers: await getHeaders(),
      });
      if (data.success) {
        setRequests(data.requests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load requests.");
    } finally {
      setLoading(false);
    }
  }, [axios, getHeaders]);

  const decideRequest = async (requestId, decision) => {
    setUpdatingId(requestId);
    try {
      const { data } = await axios.patch(
        `/api/admin/theater-requests/${requestId}`,
        { decision },
        { headers: await getHeaders() },
      );
      if (data.success) {
        toast.success(data.message);
        await fetchRequests();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update request.");
    } finally {
      setUpdatingId("");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-6">
      <Title text1="Theater" text2="Requests" />
      {requests.length === 0 ? (
        <p className="mt-6 text-gray-400">No requests are waiting for approval.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex flex-col gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{request.theaterName}</p>
                <p className="mt-1 text-sm text-gray-300">
                  {request.applicantEmail}
                </p>
                <p className="mt-1 text-sm text-gray-400">{request.address}</p>
                <p className="mt-1 text-sm text-gray-400">
                  Contact: {request.contactPhone}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Submitted {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={updatingId === request._id}
                  onClick={() => decideRequest(request._id, "approve")}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={updatingId === request._id}
                  onClick={() => decideRequest(request._id, "reject")}
                  className="rounded-full border border-gray-500 px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TheaterRequests;
