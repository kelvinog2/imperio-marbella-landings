import { useMemo, useState } from "react";
import {
  Bath,
  Car,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Gift,
  Snowflake,
  Tv,
  Utensils,
  Wifi
} from "lucide-react";

type GalleryGroup = {
  group: string;
  title: string;
  images: string[];
  detail: string;
};

type Props = {
  gallery: GalleryGroup[];
  services: string[];
};

const iconFor = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("aire")) return Snowflake;
  if (lower.includes("wifi")) return Wifi;
  if (lower.includes("tv") || lower.includes("netflix")) return Tv;
  if (lower.includes("parking")) return Car;
  if (lower.includes("cocina")) return Utensils;
  if (lower.includes("bienvenida")) return Gift;
  if (lower.includes("toallas")) return Bath;
  return Coffee;
};

export default function GalleryExplorer({ gallery, services }: Props) {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const group = gallery[activeGroup];

  const featuredServices = useMemo(() => services.slice(0, 6), [services]);

  const move = (direction: -1 | 1) => {
    setActiveImage((current) => (current + direction + group.images.length) % group.images.length);
  };

  const selectGroup = (index: number) => {
    setActiveGroup(index);
    setActiveImage(0);
  };

  return (
    <div className="gallery-shell">
      <div className="gallery-tabs" role="tablist" aria-label="Zonas del apartamento">
        {gallery.map((item, index) => (
          <button
            className={`gallery-tab ${index === activeGroup ? "is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={index === activeGroup}
            key={item.group}
            onClick={() => selectGroup(index)}
          >
            <span>{item.group}</span>
          </button>
        ))}
      </div>

      <div className="gallery-stage">
        <div className="gallery-frame">
          <img src={group.images[activeImage]} alt={group.title} loading="lazy" decoding="async" />
          <button className="gallery-control prev" type="button" onClick={() => move(-1)} aria-label="Foto anterior">
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button className="gallery-control next" type="button" onClick={() => move(1)} aria-label="Foto siguiente">
            <ChevronRight size={24} aria-hidden="true" />
          </button>
          <div className="gallery-dots" aria-hidden="true">
            {group.images.map((image, index) => (
              <span className={`gallery-dot ${index === activeImage ? "is-active" : ""}`} key={image} />
            ))}
          </div>
        </div>

        <div className="gallery-detail">
          <div>
            <h3>{group.title}</h3>
            <p>{group.detail}</p>
          </div>
          <ul className="feature-list">
            {featuredServices.map((service) => {
              const Icon = iconFor(service);
              return (
                <li key={service}>
                  <span className="feature-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>{service}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
