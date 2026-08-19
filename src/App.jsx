import {
  ArrowRight,
  Instagram,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  LockKeyhole,
  X,
} from "lucide-react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WHATSAPP = "https://wa.me/5493364007281";

const products = [
  {
    name: "Alfajores de maizena",
    description:
      "Suaves, caseros y rellenos con mucho dulce de leche.",
    category: "Clásicos",
    image: "alfajores.jpg",
  },
  {
    name: "Pasta frola de batata",
    description:
      "Un clásico casero con dulce de batata.",
    category: "Tartas",
    image: "pasta-frola-batata.jpg",
  },
  {
    name: "Pasta frola de membrillo",
    description:
      "Masa casera y dulce de membrillo, como tiene que ser.",
    category: "Tartas",
    image: "pasta-frola-membrillo.jpg",
  },
  {
    name: "Postres individuales",
    description:
      "Pequeños dulces preparados para disfrutar y compartir.",
    category: "Dulces",
    image: "postrecitos.jpg",
  },
  {
    name: "Churros rellenos",
    description:
      "Churros caseros, recién hechos y rellenos con dulce de leche.",
    category: "Churros",
    image: "churros-rellenos.jpeg",
  },
  {
    name: "Churros",
    description:
      "Crocantes por fuera, tiernos por dentro y hechos en casa.",
    category: "Churros",
    image: "churros.jpeg",
  },
  {
    name: "Pack matero",
    description:
      "Una combinación dulce perfecta para acompañar tus mates.",
    category: "Packs",
    image: "pack-dulce.jpg",
  },
];

function App() {
  const navigate = useNavigate();

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const visibleProducts = showAllProducts
    ? products
    : products.slice(0, 4);

  const hiddenProducts = products.slice(4);

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginError("");

    if (
      username === "barby367" &&
      password === "syg123"
    ) {
      sessionStorage.setItem(
        "syg_creator_authenticated",
        "true"
      );

      setShowLogin(false);
      setUsername("");
      setPassword("");

      navigate("/creador");
      return;
    }

    setLoginError("El usuario o la contraseña no son correctos.");
  };

  const closeLogin = () => {
    setShowLogin(false);
    setUsername("");
    setPassword("");
    setLoginError("");
  };

  return (
    <div className="site">

      {/* ================= HEADER ================= */}

      <header className="header">

        <a
          className="brand"
          href="#inicio"
          aria-label="SyG Pastelería"
        >
          <span className="brand-script">
            SyG
          </span>

          <span className="brand-subtitle">
            PASTELERÍA CASERA
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#inicio">
            Inicio
          </a>

          <a href="#productos">
            Productos
          </a>

          <a href="#nosotros">
            Nosotros
          </a>

          <a href="#contacto">
            Pedidos
          </a>
        </nav>

        <div className="header-actions">

          {/* LOGIN */}

          <button
            type="button"
            className="header-login"
            onClick={() => {
              setShowLogin(true);
              setLoginError("");
            }}
          >
            <LockKeyhole size={16} />
            Iniciar sesión
          </button>

          {/* WHATSAPP */}

          <a
            className="header-order"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            Pedir
          </a>

        </div>

      </header>

      <main>

        {/* ================= HERO ================= */}

        <section
          className="hero"
          id="inicio"
        >

          <div className="hero-decoration hero-decoration-left" />
          <div className="hero-decoration hero-decoration-right" />

          <div className="hero-copy">

            <p className="eyebrow">
              <Sparkles size={15} />
              Hecho en casa
            </p>

            <h1>
              Dulces que
              <span>
                saben a hogar.
              </span>
            </h1>

            <p className="hero-text">
              Pastelería casera hecha con amor,
              para acompañar tus momentos más lindos.
            </p>

            <div className="hero-actions">

              <a
                className="button button-primary"
                href="#productos"
              >
                Ver productos
                <ArrowRight size={18} />
              </a>

              <a
                className="button button-secondary"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                Hacer un pedido
              </a>

            </div>

            <div className="hero-note">

              <span className="line" />

              <span>
                Todo rico, caserito y hecho con el corazón
              </span>

              <span className="line" />

            </div>

          </div>

          {/* FOTO PRINCIPAL */}

          <div
            className="hero-visual"
            aria-label="Pack dulce de SyG Pastelería"
          >

            <div className="hero-photo-wrapper">

              <div className="hero-photo">

                <img
                  src="/images/pack-dulce.jpg"
                  alt="Pack dulce de SyG Pastelería"
                />

              </div>

              <div className="hero-photo-decoration" />

            </div>

            <div className="floating-card">

              <span>
                ♡
              </span>

              <div>

                <strong>
                  Pedidos personalizados
                </strong>

                <small>
                  Consultanos por WhatsApp
                </small>

              </div>

            </div>

          </div>

        </section>

        {/* ================= PRODUCTOS ================= */}

        <section
          className="products-section"
          id="productos"
        >

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                Nuestros favoritos
              </p>

              <h2>
                Hechos para compartir
              </h2>

            </div>

            <p className="section-intro">
              Nuestros clásicos, preparados de forma
              casera y con mucho cariño. Consultanos
              por WhatsApp para conocer disponibilidad
              y opciones.
            </p>

          </div>

          {/* PRODUCTOS VISIBLES */}

          <div className="product-grid">

            {visibleProducts.map((product, index) => (

              <article
                className="product-card"
                key={product.name}
              >

                <div
                  className={`product-image product-image-${index + 1}`}
                >

                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                  />

                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar
                    <ArrowRight size={16} />
                  </a>

                </div>

              </article>

            ))}

          </div>

          {/* PRODUCTOS OCULTOS */}

          {!showAllProducts && (

            <div className="products-more">

              <div className="products-preview">

                {hiddenProducts.map((product) => (

                  <div
                    className="preview-card"
                    key={product.name}
                  >

                    <img
                      src={`/images/${product.image}`}
                      alt=""
                    />

                    <div className="preview-overlay">

                      <span>
                        {product.name}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

              <div className="products-more-overlay">

                <button
                  type="button"
                  className="products-toggle"
                  onClick={() =>
                    setShowAllProducts(true)
                  }
                >
                  <span>
                    Ver todos los productos
                  </span>

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          )}

          {/* VER MENOS */}

          {showAllProducts && (

            <div className="products-collapse">

              <button
                type="button"
                className="products-toggle"
                onClick={() =>
                  setShowAllProducts(false)
                }
              >

                <span>
                  Ver menos
                </span>

                <ArrowRight size={18} />

              </button>

            </div>

          )}

        </section>

        {/* ================= NOSOTROS ================= */}

        <section
          className="story-section"
          id="nosotros"
        >

          <div className="story-frame">

            <div className="story-image">

              <img
                src="/images/foto-perfil.png"
                alt="Emprendedora de SyG Pastelería"
              />

            </div>

            <div className="story-copy">

              <p className="eyebrow">
                Un emprendimiento hecho con amor
              </p>

              <h2>
                De nuestra cocina a tu mesa.
              </h2>

              <p>
                SyG nace de las ganas de compartir
                cosas ricas, caseras y hechas con
                dedicación. Cada pedido se prepara
                con ese toque especial que hace que
                algo sencillo se convierta en un
                momento para recordar.
              </p>

              <p className="quote">
                “Todo rico, caserito y hecho con el corazón.”
              </p>

              <a
                className="text-link"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                Quiero hacer un pedido
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section
          className="cta-section"
          id="contacto"
        >

          <div className="cta-flower">
            ✿
          </div>

          <p className="eyebrow">
            ¿Se te antojó algo?
          </p>

          <h2>
            Hablemos de tu próximo pedido.
          </h2>

          <p>
            Escribinos por WhatsApp y te contamos
            disponibilidad, tamaños, sabores y
            opciones personalizadas.
          </p>

          <a
            className="button button-primary"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} />
            Pedir por WhatsApp
          </a>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <span className="brand-script">
            SyG
          </span>

          <p>
            Pastelería casera
          </p>

        </div>

        <div className="footer-links">

          <a href="#inicio">
            Inicio
          </a>

          <a href="#productos">
            Productos
          </a>

          <a href="#nosotros">
            Nosotros
          </a>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

        </div>

        <div className="footer-socials">

          <a
            href="#"
            aria-label="Instagram"
          >
            <Instagram size={19} />
          </a>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>

          <ShoppingBag size={19} />

        </div>

        <p className="copyright">
          © {new Date().getFullYear()} SyG Pastelería ·
          Hecho con amor
        </p>

      </footer>

      {/* ================================================== */}
      {/* LOGIN MODAL */}
      {/* ================================================== */}

      {showLogin && (

        <div
          className="login-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              closeLogin();
            }

          }}
        >

          <div className="login-modal">

            <button
              type="button"
              className="login-close"
              onClick={closeLogin}
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="login-logo">

              <span className="brand-script">
                SyG
              </span>

              <span className="brand-subtitle">
                PASTELERÍA CASERA
              </span>

            </div>

            <p className="login-eyebrow">
              ÁREA PRIVADA
            </p>

            <h2>
              Bienvenida
            </h2>

            <p className="login-description">
              Accedé al creador de publicaciones
              de SyG Pastelería.
            </p>

            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              <label>
                Usuario

                <input
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Ingresá tu usuario"
                  autoComplete="username"
                  autoFocus
                />

              </label>

              <label>
                Contraseña

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Ingresá tu contraseña"
                  autoComplete="current-password"
                />

              </label>

              {loginError && (

                <p className="login-error">
                  {loginError}
                </p>

              )}

              <button
                type="submit"
                className="login-submit"
              >
                Iniciar sesión
                <ArrowRight size={18} />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;