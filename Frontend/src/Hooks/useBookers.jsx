// hooks/useBookers.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookers() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        const check = await axios.get(
          `${url}/owner/get-Bookings`,
          { withCredentials: true }
        );

        const bookings = check?.data?.data.flatMap((items) =>
          items.bookings.map((b) => ({
            userId: b.userId,
            timeSlot: b.timeSlot,
          }))
        );

        const allBookers = [];
        for (const booking of bookings) {
          const hi = await axios.get(
            `${url}/owner/showBookers/${booking.userId}`,
            { withCredentials: true }
          );
          const user = hi?.data?.msg[0];
          allBookers.push({ ...user, timeSlot: booking.timeSlot });
        }

        setData(allBookers);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  return { datas, loading, err };
}
