import { useEffect, useState } from "react";
import "./AlertaNotificacion.css";

export const AlertaNotificacion = ({ mensaje, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || !mensaje) return null;

  return (
    <div className="alerta-notificacion-flotante">
      <span className="alerta-icono">✓</span>
      <span>{mensaje}</span>
    </div>
  );
};