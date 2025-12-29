import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users/me", { credentials: "include" });
        setAuthed(res.ok);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null; // or a spinner
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}