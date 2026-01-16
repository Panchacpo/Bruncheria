import { useState , useEffect } from "react";
import banner from "./assets/banner.png";
import bannerPremium from "./assets/bannerPremium.png";




export default function App() {
  const [version, setVersion] = useState("Clásica");
  const [qty, setQty] = useState(1);
  const PRODUCT_NAME = "Caja San Valentín";
  const DELIVERY_DATE = " ";
  const VERSION = "Caja Clásica";
  const PRICES = {
  Clásica: 18990,
  Premium: 29990,
  };
  const price = PRICES[version];
  const STOCKS = {
  Clásica: 10,
  Premium: 0, // 👈 Premium en cero
  };
  const IMAGES = {
  Clásica: banner,
  Premium: bannerPremium,
  };

  const stock = STOCKS[version];
  const targetDate = new Date("2026-02-14T00:00:00");
  const [timeLeft, setTimeLeft] = useState({});
  function calculateTimeLeft() {
    const difference = targetDate - new Date();

      if (difference <= 0) {
       return null;
     }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleReserve = () => {
    if (stock === 0) return;

    if (qty > stock) {
      alert("No hay stock suficiente");
    return;
    }



    const message = `
      Hola 👋

      Quisiera reservar:
      • ${PRODUCT_NAME}
      • Versión: ${VERSION}
      • Cantidad: ${qty}
      • Total: $${(price * qty).toLocaleString("es-CL")}

      Entrega: ${DELIVERY_DATE}

      Quedo atento/a para confirmar disponibilidad y forma de pago.
      `;



    window.open(
    `https://wa.me/56950115625?text=${encodeURIComponent(message)}`,
    "_blank"
    );
  };
  const CONTENTS = {
    Clásica: [
      "2 croissants (queso crema, cebolla, jamón, lechuga)",
      "Pote de fruta (50 g)",
      "Bandeja salada de cartón (queso, jamón serrano, aceitunas)",
      "3 chocolates Ferrero Rocher",
      "3 galletas I <3 U",
      "2 vasos de cartón",
      "Café liofilizado Marley Coffee + té supremo + azúcar o stevia",
      "Tarjeta con mensaje personalizado",
      "Decoración especial de San Valentín",
    ],
    Premium: [
      "Bandeja de madera",
      "2 croissants (queso crema, cebolla, jamón, lechuga)",
      "Pote de fruta (50 g)",
      "Bandeja salada (queso, jamón serrano, aceitunas)",
      "3 chocolates Ferrero Rocher",
      "3 galletas I <3 U",
      "2 tazas de cerámica sublimadas",
      "Café liofilizado Marley Coffee + té supremo + azúcar o stevia",
      "Tarjeta con mensaje personalizado",
      "Decoración premium de San Valentín",
    ],
  };



  return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        background: "white",
        borderRadius: 16,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        padding: 32,
      }}
      >
        <div style={{
          textAlign: "center",
          marginBottom: 20,
          marginTop: 20 ,
          width: "100%",
          padding: "12px 14px",
          background: stock === 0 ? "#9ca3af" : "#ec4899",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontSize: 20,
          cursor: stock === 0 ? "not-allowed" : "pointer",
          }}>
        <p style={{ fontWeight: "bold" }}>Faltan</p>

          {timeLeft ? (
          <p style={{ fontSize: 18 }}>
            {timeLeft.days} días · {timeLeft.hours} h ·{" "}
            {timeLeft.minutes} min · {timeLeft.seconds} s
          </p>
        ) : (
        <p>¡Hoy es San Valentín!</p>
          )}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#4b5563",
            marginBottom: 32,
          }}
        >
          Producción limitada · Reservas por orden de llegada
        </p>


      <h1 style={{ textAlign: "center", marginBottom: 8 }}>
        Un Buen Día
      </h1>
      <p style={{ textAlign: "center", marginBottom: 24 }}>
        Caja San Valentín – Edición limitada
        </p><img
          src={IMAGES[version]}
          alt={`Caja San Valentín ${version}`}
          style={{
            width: "100%",
            borderRadius: 16,
            marginBottom: 24,
            objectFit: "cover",
            transition: "all 0.3s ease",
          }}
        />




      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
        }}
      >
        {/* Columna izquierda */}
        <div>
          <ul>
             <h2>¿Qué incluye la versión {version}?</h2>
                <ul>
                  {CONTENTS[version].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

          </ul>
        </div>

        {/* Columna derecha */}
          <div>
            <p style={{ fontWeight: 600 }}>Versión</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {["Clásica", "Premium"].map((v) => (
              <button
                key={v}
                onClick={() => setVersion(v)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: v === version ? "2px solid #ec4899" : "1px solid #e5e7eb",
                  background: v === version ? "#fdf2f8" : "white",
                  fontWeight: v === version ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <p><strong>Precio:</strong> ${price.toLocaleString()}</p>

          <label>
            Cantidad:
            <input
              type="number"
              min={1}
              max={stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              disabled={stock === 0}
              style={{
                marginLeft: 8,
                width: 70,
                opacity: stock === 0 ? 0.5 : 1,
                cursor: stock === 0 ? "not-allowed" : "text",
              }}
            />

            </label>
          <><br /></>
            <p
              style={{
                marginTop: 8,
                fontWeight: 600,
                color: stock === 0 ? "#9ca3af" : stock <= 10 ? "#dc2626" : "#16a34a",
              }}
            >
              {stock === 0 ? "Sin stock disponible" : `Stock disponible: ${stock}`}
            </p>



          <p style={{ marginTop: 16 }}>
            <strong>Total:</strong> ${(price * qty).toLocaleString()}
          </p>

          <button
            onClick={handleReserve}
            disabled={stock === 0}
            style={{
              marginTop: 24,
              width: "100%",
              padding: "14px 16px",
              background: stock === 0 ? "#9ca3af" : "#ec4899",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              cursor: stock === 0 ? "not-allowed" : "pointer",
            }}
          >
            {stock === 0 ? "Agotado" : "Reservar ahora por WhatsApp"}
          </button>

            <br></br>
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
              *La reserva se confirma una vez realizado el abono.
          </p>


        </div>
      </div>
    </div>
  </div>
);
}
