/* eslint-disable @next/next/no-img-element */
export const ImageGenerator = (props) => {
  if (!props.image) {
    alert("Pas d'image");
  }

  return (
    <div
      style={{
        display: "flex",
        padding: `${props.settings.padding}px`,
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
