import React, { useRef, useState } from "react";
import { ArrowRight, Sparkles, Upload, Shuffle } from "lucide-react";
import html2canvas from "html2canvas";
import "./creator.css";

const DEFAULT_PHRASE =
  "Todo rico, caserito y hecho con el corazón.";

const FORMAT_POST = {
  id: "post",
  label: "Post",
  width: 1080,
  height: 1080,
};

const FORMAT_STORY = {
  id: "story",
  label: "Historia",
  width: 1080,
  height: 1920,
};

const COLORS = [
  {
    id: "beige",
    name: "Beige SyG",
    value: "#f5eeea",
  },
  {
    id: "cream",
    name: "Crema",
    value: "#fffaf6",
  },
  {
    id: "pink",
    name: "Rosa suave",
    value: "#ead7d0",
  },
  {
    id: "green",
    name: "Verde suave",
    value: "#e1e9df",
  },
  {
    id: "brown",
    name: "Marrón",
    value: "#ead8ca",
  },
];

const templates = [
  {
    id: "clean",
    name: "Elegante",
    description: "Foto protagonista y frase delicada.",
  },
  {
    id: "soft",
    name: "Suave",
    description: "Foto + degradado cálido.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Diseño limpio y moderno.",
  },
  {
    id: "organic",
    name: "Orgánico",
    description: "Formas suaves y decoración artesanal.",
  },
];

const contentTypes = [
  {
    id: "photo",
    title: "Foto + frase",
    description: "Una foto de tus productos con un mensaje.",
  },
  {
    id: "quote",
    title: "Solo frase",
    description: "Diseño elegante sin utilizar ninguna foto.",
  },
  {
    id: "promotion",
    title: "Promoción",
    description: "Ideal para packs, novedades y pedidos.",
  },
];

const quickPhrases = [
  "Todo rico, caserito y hecho con el corazón.",
  "El combo perfecto para una tarde de mate. 🧉",
  "¿Se te antojó algo dulce?",
  "Hecho en casa, pensado para vos.",
  "Un pequeño momento dulce.",
  "Preparado con amor para compartir.",
];

const promotionPresets = [
  {
    title: "PACK MATERO",
    subtitle: "Una combinación dulce perfecta para acompañar tus mates.",
    badge: "NUEVO",
  },
  {
    title: "PEDIDOS ABIERTOS",
    subtitle: "Escribinos por WhatsApp y armamos tu pedido.",
    badge: "SYG",
  },
  {
    title: "PARA COMPARTIR",
    subtitle: "Algo rico siempre hace más lindo el momento.",
    badge: "HECHO EN CASA",
  },
];

function Creator() {
  const [format, setFormat] = useState(FORMAT_POST);

  const [contentType, setContentType] = useState("photo");

  const [image, setImage] = useState("/images/pack-dulce.jpg");
  const [imageName, setImageName] = useState("pack-dulce.jpg");

  const [phrase, setPhrase] = useState(DEFAULT_PHRASE);

  const [template, setTemplate] = useState("clean");

  const [textPosition, setTextPosition] = useState("bottom");

  const [showLogo, setShowLogo] = useState(true);

  const [backgroundColor, setBackgroundColor] = useState("#f5eeea");

  const [decoration, setDecoration] = useState("floral");

  const [promotionTitle, setPromotionTitle] =
    useState("PACK MATERO");

  const [promotionSubtitle, setPromotionSubtitle] =
    useState(
      "Una combinación dulce perfecta para acompañar tus mates."
    );

  const [promotionBadge, setPromotionBadge] =
    useState("NUEVO");

 const fileInputRef = useRef(null);

const previewDesignRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setImageName(file.name);
    setContentType("photo");
  };

  const applyPromotion = (preset) => {
    setContentType("promotion");
    setPromotionTitle(preset.title);
    setPromotionSubtitle(preset.subtitle);
    setPromotionBadge(preset.badge);
  };

  const surpriseMe = () => {
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    const randomColor =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    const randomPhrase =
      quickPhrases[
        Math.floor(Math.random() * quickPhrases.length)
      ];

    const randomPosition = ["top", "center", "bottom"][
      Math.floor(Math.random() * 3)
    ];

    setTemplate(randomTemplate.id);
    setBackgroundColor(randomColor.value);
    setPhrase(randomPhrase);
    setTextPosition(randomPosition);

    const modes = ["photo", "quote", "promotion"];

    setContentType(
      modes[Math.floor(Math.random() * modes.length)]
    );
  };
const downloadImage = async () => {
  const element = previewDesignRef.current;

  if (!element) {
    console.error("No se encontró la previsualización");
    return;
  }

  try {
    // Esperar a que las imágenes estén completamente cargadas
    const images = Array.from(element.querySelectorAll("img"));

    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
              return;
            }

            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );

    // Esperar a las fuentes
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    /*
     * Tamaño REAL de Instagram
     *
     * Post    -> 1080 x 1080
     * Historia -> 1080 x 1920
     */
    const exportWidth = 1080;
    const exportHeight = format.id === "story" ? 1920 : 1080;

    /*
     * Creamos un clon para NO modificar
     * la previsualización que ve el usuario.
     */
    const clone = element.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.left = "-10000px";
    clone.style.top = "0";
    clone.style.width = `${exportWidth}px`;
    clone.style.height = `${exportHeight}px`;
    clone.style.minWidth = `${exportWidth}px`;
    clone.style.minHeight = `${exportHeight}px`;
    clone.style.maxWidth = "none";
    clone.style.maxHeight = "none";
    clone.style.margin = "0";
    clone.style.transform = "none";
    clone.style.overflow = "hidden";
    clone.style.boxSizing = "border-box";

    /*
     * Añadimos el clon al documento.
     * Esto hace que html2canvas pueda calcular
     * correctamente todos los estilos.
     */
    document.body.appendChild(clone);

    /*
     * Forzamos también el tamaño de todos los
     * elementos que dependan de porcentajes.
     */
    const allElements = clone.querySelectorAll("*");

    allElements.forEach((child) => {
      child.style.boxSizing = "border-box";
    });

    /*
     * Esperamos un frame para que el navegador
     * termine de renderizar el clon.
     */
    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    const canvas = await html2canvas(clone, {
      width: exportWidth,
      height: exportHeight,

      windowWidth: exportWidth,
      windowHeight: exportHeight,

      scale: 1,

      useCORS: true,
      allowTaint: false,

      backgroundColor: backgroundColor || "#f5eeea",

      logging: false,

      imageTimeout: 15000,

      onclone: (clonedDocument) => {
        const clonedElement = clonedDocument.body.lastElementChild;

        if (!clonedElement) return;

        clonedElement.style.width = `${exportWidth}px`;
        clonedElement.style.height = `${exportHeight}px`;
        clonedElement.style.backgroundColor =
          backgroundColor || "#f5eeea";
      },
    });

    /*
     * Eliminamos el clon.
     */
    document.body.removeChild(clone);

    /*
     * Descarga PNG
     */
    const link = document.createElement("a");

    link.download = `syg-${contentType}-${format.id}-${Date.now()}.png`;

    link.href = canvas.toDataURL("image/png", 1);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generando la publicación:", error);

    alert(
      "No se pudo generar la publicación. Revisá la consola para ver el error."
    );
  }
};

  const drawBackground = (ctx, width, height) => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (decoration === "none") return;

    ctx.save();

    ctx.strokeStyle = "rgba(90,50,31,0.22)";
    ctx.fillStyle = "rgba(90,50,31,0.08)";
    ctx.lineWidth = 3;

    if (
      decoration === "floral" ||
      decoration === "branches"
    ) {
      // Rama superior izquierda
      ctx.beginPath();
      ctx.moveTo(40, 170);
      ctx.quadraticCurveTo(130, 90, 270, 55);
      ctx.stroke();

      for (let i = 0; i < 5; i++) {
        const x = 85 + i * 38;
        const y = 135 - i * 17;

        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          18,
          38,
          -0.7,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Rama inferior derecha
      ctx.beginPath();
      ctx.moveTo(
        width - 40,
        height - 150
      );

      ctx.quadraticCurveTo(
        width - 140,
        height - 80,
        width - 280,
        height - 55
      );

      ctx.stroke();

      for (let i = 0; i < 5; i++) {
        const x =
          width - 85 - i * 38;

        const y =
          height - 120 + i * 17;

        ctx.beginPath();

        ctx.ellipse(
          x,
          y,
          18,
          38,
          0.7,
          0,
          Math.PI * 2
        );

        ctx.stroke();
      }
    }

    if (
      decoration === "flowers" ||
      decoration === "floral"
    ) {
      const flowers = [
        {
          x: 85,
          y: 90,
        },
        {
          x: width - 90,
          y: 110,
        },
        {
          x: 80,
          y: height - 100,
        },
        {
          x: width - 85,
          y: height - 90,
        },
      ];

      flowers.forEach((flower) => {
        for (let i = 0; i < 6; i++) {
          const angle =
            (Math.PI * 2 * i) / 6;

          const petalX =
            flower.x + Math.cos(angle) * 28;

          const petalY =
            flower.y + Math.sin(angle) * 28;

          ctx.beginPath();

          ctx.ellipse(
            petalX,
            petalY,
            18,
            32,
            angle,
            0,
            Math.PI * 2
          );

          ctx.stroke();
        }

        ctx.beginPath();

        ctx.arc(
          flower.x,
          flower.y,
          12,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });
    }

    if (decoration === "dots") {
      const dots = [
        [70, 80],
        [120, 120],
        [width - 70, 80],
        [width - 120, 120],
        [70, height - 80],
        [120, height - 120],
        [width - 70, height - 80],
        [width - 120, height - 120],
      ];

      dots.forEach(([x, y]) => {
        ctx.beginPath();

        ctx.arc(
          x,
          y,
          8,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });
    }

    ctx.restore();
  };

  const drawImageCover = (
    ctx,
    background,
    x,
    y,
    width,
    height,
    radius = 0
  ) => {
    const imageRatio =
      background.width / background.height;

    const boxRatio = width / height;

    let drawWidth;
    let drawHeight;

    if (imageRatio > boxRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
    }

    const imageX =
      x + (width - drawWidth) / 2;

    const imageY =
      y + (height - drawHeight) / 2;

    ctx.save();

    if (radius > 0) {
      ctx.beginPath();

      ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
      );

      ctx.clip();
    }

    ctx.drawImage(
      background,
      imageX,
      imageY,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  };

  const drawWrappedText = (
    ctx,
    text,
    width,
    maxWidth,
    fontSize,
    lineHeight,
    startY
  ) => {
    if (!text?.trim()) return;

    const words = text.trim().split(" ");

    const lines = [];

    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (
        ctx.measureText(testLine).width >
        maxWidth
      ) {
        if (currentLine) {
          lines.push(currentLine);
        }

        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    lines.forEach((line, index) => {
      ctx.fillText(
        line,
        width / 2,
        startY + index * lineHeight
      );
    });
  };

  const drawLogo = (
    ctx,
    width,
    height
  ) => {
    if (!showLogo) return;

    ctx.save();

    ctx.textAlign = "center";

    ctx.fillStyle = "#5a321f";

    ctx.font =
      'italic 54px "Brush Script MT", cursive';

    ctx.fillText(
      "SyG",
      width / 2,
      height - 75
    );

    ctx.font =
      "600 15px Arial";

    ctx.letterSpacing = "2px";

    ctx.fillText(
      "PASTELERÍA CASERA",
      width / 2,
      height - 42
    );

    ctx.restore();
  };

  const drawPublication = (
    ctx,
    background
  ) => {
    const width = format.width;
    const height = format.height;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    /*
     * FONDO
     */

    drawBackground(
      ctx,
      width,
      height
    );

    /*
     * FOTO
     */

    if (
      contentType === "photo" &&
      background
    ) {
      if (template === "clean") {
        drawImageCover(
          ctx,
          background,
          80,
          format.id === "story"
            ? 220
            : 80,
          width - 160,
          format.id === "story"
            ? height * 0.55
            : height * 0.68,
          70
        );
      }

      if (template === "soft") {
        drawImageCover(
          ctx,
          background,
          0,
          0,
          width,
          height,
          0
        );

        const gradient =
          ctx.createLinearGradient(
            0,
            height * 0.45,
            0,
            height
          );

        gradient.addColorStop(
          0,
          "rgba(245,238,234,0)"
        );

        gradient.addColorStop(
          1,
          "rgba(245,238,234,0.98)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
          0,
          height * 0.35,
          width,
          height * 0.65
        );
      }

      if (template === "minimal") {
        drawImageCover(
          ctx,
          background,
          60,
          format.id === "story"
            ? 150
            : 60,
          width - 120,
          format.id === "story"
            ? height * 0.58
            : height * 0.75,
          28
        );
      }

      if (template === "organic") {
        ctx.save();

        ctx.beginPath();

        ctx.ellipse(
          width / 2,
          format.id === "story"
            ? height * 0.38
            : height * 0.42,
          width * 0.38,
          format.id === "story"
            ? height * 0.24
            : height * 0.30,
          0,
          0,
          Math.PI * 2
        );

        ctx.clip();

        drawImageCover(
          ctx,
          background,
          0,
          0,
          width,
          height,
          0
        );

        ctx.restore();
      }
    }

    /*
     * DISEÑO SIN FOTO
     */

    if (contentType === "quote") {
  ctx.fillStyle = "#5a321f";

  ctx.textAlign = "center";

  const fontSize =
    format.id === "story"
      ? 76
      : 70;

  const lineHeight =
    format.id === "story"
      ? 88
      : 82;

  ctx.font = `italic ${fontSize}px Georgia`;

  let startY;

  if (textPosition === "top") {
    startY =
      format.id === "story"
        ? height * 0.25
        : height * 0.28;
  } else if (textPosition === "center") {
    startY =
      format.id === "story"
        ? height * 0.48
        : height * 0.48;
  } else {
    startY =
      format.id === "story"
        ? height * 0.72
        : height * 0.72;
  }

  drawWrappedText(
    ctx,
    phrase,
    width,
    width * 0.72,
    fontSize,
    lineHeight,
    startY
  );

  ctx.fillStyle =
    "rgba(90,50,31,0.45)";

  ctx.fillRect(
    width / 2 - 35,
    startY - 70,
    70,
    2
  );
}

    /*
     * PROMOCIÓN
     */

    if (contentType === "promotion") {
      ctx.textAlign = "center";

      ctx.fillStyle =
        "rgba(255,255,255,0.62)";

      ctx.beginPath();

      ctx.roundRect(
        100,
        format.id === "story"
          ? height * 0.30
          : height * 0.28,
        width - 200,
        format.id === "story"
          ? height * 0.35
          : height * 0.42,
        55
      );

      ctx.fill();

      ctx.fillStyle = "#5a321f";

      ctx.font =
        "600 20px Arial";

      ctx.letterSpacing = "3px";

      ctx.fillText(
        promotionBadge,
        width / 2,
        format.id === "story"
          ? height * 0.38
          : height * 0.36
      );

      ctx.font =
        'italic 76px Georgia';

      drawWrappedText(
        ctx,
        promotionTitle,
        width,
        width * 0.72,
        76,
        86,
        format.id === "story"
          ? height * 0.46
          : height * 0.45
      );

      ctx.font =
        "400 30px Arial";

      drawWrappedText(
        ctx,
        promotionSubtitle,
        width,
        width * 0.68,
        30,
        42,
        format.id === "story"
          ? height * 0.56
          : height * 0.57
      );
    }

    /*
     * FRASE SOBRE FOTO
     */

    if (
      contentType === "photo" &&
      phrase.trim()
    ) {
      ctx.fillStyle = "#5a321f";

      ctx.textAlign = "center";

      const fontSize =
        format.id === "story"
          ? 68
          : 62;

      ctx.font =
        `italic ${fontSize}px Georgia`;

      let startY;

      if (textPosition === "top") {
        startY =
          format.id === "story"
            ? 115
            : 115;
      } else if (
        textPosition === "center"
      ) {
        startY =
          height / 2;
      } else {
        startY =
          height -
          (format.id === "story"
            ? 300
            : 145);
      }

      drawWrappedText(
        ctx,
        phrase,
        width,
        width * 0.76,
        fontSize,
        fontSize * 1.12,
        startY
      );
    }

    /*
     * LOGO
     */

    drawLogo(
      ctx,
      width,
      height
    );
  };

  return (
    <div className="creator-page">

      <header className="creator-header">

        <a
          href="/"
          className="creator-brand"
        >
          <span>SyG</span>
          <small>
            PASTELERÍA CASERA
          </small>
        </a>

        <div className="creator-title">
          <span>CREADOR</span>
          <h1>
            Contenido para Instagram
          </h1>
        </div>

        <a
          href="/"
          className="creator-back"
        >
          ← Volver a la web
        </a>

      </header>

      <main className="creator-layout">

        <section className="creator-panel">

          {/* 01 TIPO DE CONTENIDO */}

          <div className="creator-section">

            <div className="creator-section-title">
              <span>01</span>

              <div>
                <h2>
                  ¿Qué querés crear?
                </h2>

                <p>
                  Elegí el tipo de publicación.
                </p>
              </div>
            </div>

            <div className="content-type-grid">

              {contentTypes.map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      contentType ===
                      item.id
                        ? "content-type-card active"
                        : "content-type-card"
                    }
                    onClick={() =>
                      setContentType(
                        item.id
                      )
                    }
                  >
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.description}
                    </span>
                  </button>
                )
              )}

            </div>

          </div>

          {/* FOTO */}

          {contentType !== "promotion" && (
  <div className="detail-row">

    <label>
      Posición de la frase
    </label>

    <select
      value={textPosition}
      onChange={(event) =>
        setTextPosition(event.target.value)
      }
    >
      <option value="top">
        Arriba
      </option>

      <option value="center">
        Centro
      </option>

      <option value="bottom">
        Abajo
      </option>
    </select>

  </div>
)}

          {/* FORMATO */}

          <div className="creator-section">

            <div className="creator-section-title">

              <span>
                {contentType === "photo"
                  ? "03"
                  : "02"}
              </span>

              <div>

                <h2>
                  Formato
                </h2>

                <p>
                  Elegí dónde vas a publicar.
                </p>

              </div>

            </div>

            <div className="format-options">

              <button
                type="button"
                className={
                  format.id === "post"
                    ? "format-option active"
                    : "format-option"
                }
                onClick={() =>
                  setFormat(
                    FORMAT_POST
                  )
                }
              >

                <div className="format-icon post-icon" />

                <div>
                  <strong>
                    Post
                  </strong>

                  <small>
                    1080 × 1080 · Feed
                  </small>
                </div>

              </button>

              <button
                type="button"
                className={
                  format.id === "story"
                    ? "format-option active"
                    : "format-option"
                }
                onClick={() =>
                  setFormat(
                    FORMAT_STORY
                  )
                }
              >

                <div className="format-icon story-icon" />

                <div>
                  <strong>
                    Historia
                  </strong>

                  <small>
                    1080 × 1920 · 9:16
                  </small>
                </div>

              </button>

            </div>

          </div>

          {/* FRASE */}

          {contentType !== "promotion" && (
  <div className="position-control">

    <label>
      Posición de la frase
    </label>

    <div className="position-options">

      <button
        type="button"
        className={
          textPosition === "top"
            ? "position-option active"
            : "position-option"
        }
        onClick={() =>
          setTextPosition("top")
        }
      >
        <span>↑</span>
        Arriba
      </button>

      <button
        type="button"
        className={
          textPosition === "center"
            ? "position-option active"
            : "position-option"
        }
        onClick={() =>
          setTextPosition("center")
        }
      >
        <span>●</span>
        Centro
      </button>

      <button
        type="button"
        className={
          textPosition === "bottom"
            ? "position-option active"
            : "position-option"
        }
        onClick={() =>
          setTextPosition("bottom")
        }
      >
        <span>↓</span>
        Abajo
      </button>

    </div>

  </div>
)}

          {/* PROMOCIÓN */}

          {contentType === "promotion" && (
            <div className="creator-section">

              <div className="creator-section-title">

                <span>03</span>

                <div>
                  <h2>
                    Tu promoción
                  </h2>

                  <p>
                    Prepará una publicación para vender.
                  </p>
                </div>

              </div>

              <input
                className="creator-input"
                value={promotionBadge}
                onChange={(event) =>
                  setPromotionBadge(
                    event.target.value
                  )
                }
                placeholder="Etiqueta"
              />

              <input
                className="creator-input"
                value={promotionTitle}
                onChange={(event) =>
                  setPromotionTitle(
                    event.target.value
                  )
                }
                placeholder="Título"
              />

              <textarea
                className="creator-textarea"
                value={promotionSubtitle}
                onChange={(event) =>
                  setPromotionSubtitle(
                    event.target.value
                  )
                }
                placeholder="Descripción"
                maxLength={150}
              />

              <div className="promotion-presets">

                <span>
                  Plantillas rápidas
                </span>

                {promotionPresets.map(
                  (preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() =>
                        applyPromotion(
                          preset
                        )
                      }
                    >
                      {preset.title}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* ESTILO */}

          <div className="creator-section">

            <div className="creator-section-title">

              <span>
                {contentType === "promotion"
                  ? "04"
                  : contentType === "photo"
                  ? "05"
                  : "04"}
              </span>

              <div>
                <h2>
                  Estilo
                </h2>

                <p>
                  Elegí la estética.
                </p>
              </div>

            </div>

            <div className="template-options">

              {templates.map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      template === item.id
                        ? "template-option active"
                        : "template-option"
                    }
                    onClick={() =>
                      setTemplate(
                        item.id
                      )
                    }
                  >
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.description}
                    </span>
                  </button>
                )
              )}

            </div>

          </div>

          {/* COLOR */}

          <div className="creator-section">

            <div className="creator-section-title">

              <span>05</span>

              <div>
                <h2>
                  Fondo
                </h2>

                <p>
                  Elegí el color de la publicación.
                </p>
              </div>

            </div>

            <div className="color-options">

              {COLORS.map(
                (color) => (
                  <button
                    key={color.id}
                    type="button"
                    className={
                      backgroundColor ===
                      color.value
                        ? "color-option active"
                        : "color-option"
                    }
                    onClick={() =>
                      setBackgroundColor(
                        color.value
                      )
                    }
                    title={color.name}
                  >
                    <span
                      style={{
                        backgroundColor:
                          color.value,
                      }}
                    />
                    {color.name}
                  </button>
                )
              )}

            </div>

          </div>

          {/* DETALLES */}

          <div className="creator-section">

            <div className="creator-section-title">

              <span>06</span>

              <div>
                <h2>
                  Detalles
                </h2>

                <p>
                  Ajustá los últimos detalles.
                </p>
              </div>

            </div>

            {contentType === "photo" && (
              <div className="detail-row">

                <label>
                  Posición del texto
                </label>

                <select
                  value={textPosition}
                  onChange={(event) =>
                    setTextPosition(
                      event.target.value
                    )
                  }
                >
                  <option value="top">
                    Arriba
                  </option>

                  <option value="center">
                    Centro
                  </option>

                  <option value="bottom">
                    Abajo
                  </option>
                </select>

              </div>
            )}

            <div className="detail-row">

              <label>
                Decoración
              </label>

              <select
                value={decoration}
                onChange={(event) =>
                  setDecoration(
                    event.target.value
                  )
                }
              >
                <option value="none">
                  Ninguna
                </option>

                <option value="floral">
                  Floral
                </option>

                <option value="flowers">
                  Flores
                </option>

                <option value="branches">
                  Ramitas
                </option>

                <option value="dots">
                  Puntos
                </option>
              </select>

            </div>

            <label className="logo-toggle">

              <input
                type="checkbox"
                checked={showLogo}
                onChange={(event) =>
                  setShowLogo(
                    event.target.checked
                  )
                }
              />

              <span className="custom-checkbox">
                ✓
              </span>

              <div>
                <strong>
                  Añadir logo SyG
                </strong>

                <small>
                  Añade la marca automáticamente.
                </small>
              </div>

            </label>

          </div>

          {/* SORPRÉNDEME */}

          <button
            type="button"
            className="surprise-button"
            onClick={surpriseMe}
          >
            <Shuffle size={18} />
            Sorpréndeme
            <small>
              Generar una propuesta al azar
            </small>
          </button>

          {/* DESCARGAR */}

          <button
            type="button"
            className="download-button"
            onClick={downloadImage}
          >
            Descargar publicación
            <ArrowRight size={19} />
          </button>

        </section>

        {/* PREVIEW */}

        <section className="creator-preview-section">

          <div className="preview-heading">

            <div>

              <span>
                PREVISUALIZACIÓN
              </span>

              <h2>
                Así se verá tu publicación
              </h2>

            </div>

            <div className="preview-size">
              {format.width} ×{" "}
              {format.height}
            </div>

          </div>

          <div
            className={`instagram-preview ${
              format.id === "story"
                ? "instagram-preview-story"
                : "instagram-preview-post"
            }`}
          >

            <div
  ref={previewDesignRef}
  className={`preview-design preview-${template}`}
  style={{
    backgroundColor: backgroundColor,
  }}
>
  {contentType === "photo" && (
    <img
      src={image}
      alt="Previsualización"
    />
  )}

  {decoration !== "none" && (
    <div
      className={`preview-decoration preview-decoration-${decoration}`}
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  )}

  {template === "soft" && contentType === "photo" && (
    <div className="preview-gradient" />
  )}

  {template === "clean" && contentType === "photo" && (
    <div className="preview-frame" />
  )}

  {contentType !== "promotion" && (
    <div
      className={`preview-text preview-text-${textPosition}`}
    >
      {phrase}
    </div>
  )}

  {contentType === "promotion" && (
    <div className="preview-promotion">
      <span>{promotionBadge}</span>

      <h3>
        {promotionTitle}
      </h3>

      <p>
        {promotionSubtitle}
      </p>
    </div>
  )}

  {showLogo && (
    <div className="preview-logo">
      <span>SyG</span>

      <small>
        PASTELERÍA CASERA
      </small>
    </div>
  )}
</div>

          </div>

          <div className="preview-hint">

            <Sparkles size={15} />

            <span>
              La imagen se descargará en{" "}
              <strong>
                {format.width} ×{" "}
                {format.height}px
              </strong>
              , lista para Instagram.
            </span>

          </div>

        </section>

      </main>

      

    </div>
  );
}

export default Creator;