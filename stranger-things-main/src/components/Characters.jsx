import { characters } from "../data/content";
import "./Characters.css";

const ID_MAP = {
  "Eleven":"eleven","Mike Wheeler":"mike","Will Byers":"will",
  "Nancy Wheeler":"nancy","Dustin":"dustin","Lucas":"lucas",
  "Max Mayfield":"max","Steve Harrington":"steve",
};

const IMG_MAP = {
  "Eleven":"/nobg/eleven.png","Mike Wheeler":"/nobg/mike wheeler.png",
  "Will Byers":"/nobg/will buyers.png","Nancy Wheeler":"/nobg/nancy.png",
  "Dustin":"/nobg/dustin.png","Lucas":"/nobg/Lucas.png",
  "Max Mayfield":"/nobg/max mayfield.png","Steve Harrington":"/nobg/steve harington.png",
};

export default function Characters() {
  return (
    <section id="characters" className="characters">
      <h2 className="section-title">THE HEROES OF HAWKINS</h2>
      <div className="characters__grid">
        {characters.map(c => {
          const id  = ID_MAP[c.name];
          const img = IMG_MAP[c.name];
          return (
            <div
              key={c.name}
              className="char-card"
              data-char-id={id}
              style={{ "--accent": c.color }}
            >
              <div className="char-card__glow"/>
              {/* measurement slot — CharOverlay flies into this */}
              <div className="char-card__slot">
                {/* card image — hidden until overlay char lands here */}
                {img && (
                  <img
                    src={img}
                    alt={c.name}
                    className="char-card__img"
                    draggable={false}
                    style={{ opacity: 0 }}
                  />
                )}
              </div>
              <div className="char-card__body">
                <h3 className="char-card__name">{c.name}</h3>
                <span className="char-card__power">{c.power}</span>
                <p className="char-card__quote">"{c.quote}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
