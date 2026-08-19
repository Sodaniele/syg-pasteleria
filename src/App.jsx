import {
  ArrowRight,
  Instagram,
  MessageCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import React from "react";

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
    name: "Postrecitos",
    description:
      "Pequeños dulces preparados para disfrutar y compartir.",
    category: "Dulces",
    image: "postrecitos.jpg",
  },
];

const categories = [
  {
    title: "Alfajores",
    subtitle: "Pequeños momentos dulces",
  },
  {
    title: "Tartas",
    subtitle: "Para compartir",
  },
  {
    title: "Pasta frola",
    subtitle: "Un clásico argentino",
  },
  {
     title: "Packs personalizados",
    subtitle: "Armá tu combinación",
  },
];

function App() {
  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <a
          className="brand"
          href="#inicio"
          aria-label="SyG Pastelería"
        >
          <span className="brand-script">SyG</span>
          <span className="brand-subtitle">
            PASTELERÍA CASERA
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Pedidos</a>
        </nav>

        <a
          className="header-order"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          Pedir
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="inicio">
          <div className="hero-decoration hero-decoration-left" />
          <div className="hero-decoration hero-decoration-right" />

          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={15} />
              Hecho en casa
            </p>

            <h1>
              Dulces que
              <span>saben a hogar.</span>
            </h1>

            <p className="hero-text">
              Pastelería casera hecha con amor, para acompañar
              tus momentos más lindos.
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
              <span>♡</span>

              <div>
                <strong>Pedidos personalizados</strong>
                <small>
                  Consultanos por WhatsApp
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="category-section">
          <div className="section-heading centered">
            <p className="eyebrow">
              Para cada antojo
            </p>

            <h2>Elegí tu momento dulce</h2>

            <p>
              Algunos de nuestros clásicos para empezar
              a conocernos.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className={`category-card category-${index + 1}`}
                href="#productos"
                key={category.title}
              >
                <div className="category-art">
                  <span>
                    {["✿", "♡", "❀", "✦"][index]}
                  </span>
                </div>

                <div>
                  <h3>{category.title}</h3>
                  <p>{category.subtitle}</p>
                </div>

                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section
          className="products-section"
          id="productos"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                Nuestros favoritos
              </p>

              <h2>Hechos para compartir</h2>
            </div>

            <p className="section-intro">
              Nuestros clásicos, preparados de forma casera
              y con mucho cariño. Consultanos por WhatsApp
              para conocer disponibilidad y opciones.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
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

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

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
        </section>

        {/* NOSOTROS */}
        <section
          className="story-section"
          id="nosotros"
        >
          <div className="story-frame">
            <div className="story-image">
              <div className="story-placeholder-content">
                <span>SyG</span>
                <small>
                  Una foto de la emprendedora
                  próximamente
                </small>
              </div>
            </div>

            <div className="story-copy">
              <p className="eyebrow">
                Un emprendimiento hecho con amor
              </p>

              <h2>
                De nuestra cocina a tu mesa.
              </h2>

              <p>
                SyG nace de las ganas de compartir cosas
                ricas, caseras y hechas con dedicación.
                Cada pedido se prepara con ese toque
                especial que hace que algo sencillo se
                convierta en un momento para recordar.
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

        {/* CTA */}
        <section
          className="cta-section"
          id="contacto"
        >
          <div className="cta-flower">✿</div>

          <p className="eyebrow">
            ¿Se te antojó algo?
          </p>

          <h2>
            Hablemos de tu próximo pedido.
          </h2>

          <p>
            Escribinos por WhatsApp y te contamos
            disponibilidad, tamaños, sabores y opciones
            personalizadas.
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-script">SyG</span>
          <p>Pastelería casera</p>
        </div>

        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
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
    </div>
  );
}

export default App;