"use client";

import { useState } from "react";
import cn from "classnames";
import { renderPNG } from "./render-png";
import { ImageGenerator } from "./ImageGenerator";

const Settings = ({ setImage, setSettings, className, settings }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result; // Set the image source to the base64 result

      img.onload = () => {
        setImage({
          src: img.src, // Store the image in base64
          width: img.width, // Store the width of the image
        });
      };
    };

    if (file) {
      reader.readAsDataURL(file); // Convertit le fichier en base64
    }
  };

  return (
    <div className={cn("card bg-neutral text-neutral-content", className)}>
      <div className="card-body">
        <h1 className="text-2xl pb-2">Settings</h1>
        <form className="flex flex-col gap-5">
          <div className="flex gap-2 flex-col">
            <p className="w-full">File</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="bg-primary file-input w-full max-w-xs"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="w-full">Padding</p>
            <input
              type="range"
              min={0}
              max="99"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  padding: parseInt(e.target.value),
                })
              }
              value={settings.padding}
              className="range range-primary"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="w-full">Shadow</p>
            <input
              type="range"
              min={0}
              max="99"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  shadow: parseInt(e.target.value),
                })
              }
              value={settings.shadow}
              className="range range-primary"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="w-full">Radius</p>
            <input
              type="range"
              min={0}
              max="99"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  radius: parseInt(e.target.value),
                })
              }
              value={settings.radius}
              className="range range-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const [image, setImage] = useState();
  const [settings, setSettings] = useState({
    padding: 10,
    radius: 10,
    shadow: 10,
  });

  return (
    <div className="lg:max-w-4xl m-auto p-10 lg:p-0">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 justify-center min-h-screen w-full">
        <Settings
          setSettings={setSettings}
          setImage={setImage}
          settings={settings}
          className="lg:flex-1 lg:w-1/2"
        />
        <div className="lg:flex-1 text-center lg:w-1/2 border p-5 rounded-md">
          {image ? (
            <>
              <ImageGenerator settings={settings} image={image} />
              <button
                className="btn"
                disabled={!image}
                onClick={async () => {
                  const { blob } = await renderPNG({
                    image,
                    settings,
                  });
                  const url = URL.createObjectURL(blob);

                  // Créez un lien temporaire pour le téléchargement
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "image.png"; // Nom du fichier à télécharger
                  document.body.appendChild(a); // Ajoutez le lien au DOM
                  a.click(); // Simulez un clic sur le lien
                  document.body.removeChild(a); // Supprimez le lien du DOM
                  URL.revokeObjectURL(url); // Libérez l'URL de l'objet
                }}
              >
                Download
              </button>
            </>
          ) : (
            <p>Upload an image first.</p>
          )}
        </div>
      </div>
    </div>
  );
}
