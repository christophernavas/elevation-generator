"use client";

import { useState } from "react";
import cn from "classnames";

const Settings = ({ setImage, setSettings, className, settings }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage({
        src: reader.result, // Ici, nous stockons l'image en base64
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Convertit le fichier en base64
    }
  };

  return (
    <div className={cn("card bg-neutral", className)}>
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
              value={10}
              className="range range-primary"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="w-full">Shadow</p>
            <input
              type="range"
              min={0}
              max="99"
              value="40"
              className="range range-primary"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="w-full">Radius</p>
            <input
              type="range"
              min={0}
              max="99"
              value="40"
              className="range range-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

/* eslint-disable @next/next/no-img-element */
const ImageGenerator = (props) => {
  console.log(props.image);
  if (!props.image) {
    alert("Pas d'image");
  }

  return (
    <div
      style={{
        display: "flex",
        // Ajoute le padding
      }}
    >
      <img
        src={props.image.src}
        alt="Image"
        style={{
          // Ajoute le border-radius et le boxShadow
          boxShadow: `0 0 ${props.settings.shadow}px rgba(0,0,0,.${props.settings.shadow})`,
          borderRadius: `${props.settings.radius}px`,
        }}
      />
    </div>
  );
};

export default function Home() {
  const [image, setImage] = useState();
  const [settings, setSettings] = useState({
    padding: 0,
    borderRadius: 0,
    shadow: 0,
  });
  console.log(image);
  return (
    <div className="max-w-4xl m-auto  ">
      <div className="flex items-center gap-x-20 justify-center min-h-screen w-full">
        <Settings
          setSettings={setSettings}
          setImage={setImage}
          className="flex-1 w-1/2"
        />
        <div className="flex-1 text-center w-1/2 h-fit border p-5 rounded-md">
          {image ? (
            <ImageGenerator settings={settings} image={image} />
          ) : (
            <p>Upload an image first.</p>
          )}
        </div>
      </div>
    </div>
  );
}
