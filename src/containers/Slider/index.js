import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Filtrer les événements entre janvier (0) et mai (4)
  const filteredData = data?.focus.filter((event) => {
    const eventMonth = new Date(event.date).getMonth();
    return eventMonth >= 0 && eventMonth <= 4; // Entre janvier et mai
  });

  // Trier par ordre croissant de date
  const byDateAsc = filteredData?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  );

  const dataLength = byDateAsc?.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < dataLength - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [dataLength]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event) => (
        <div key={event.id || event.title}> {/* Utilisation de event.id ou event.title comme clé */}
          <div
            className={`SlideCard SlideCard--${
              index === byDateAsc.indexOf(event) ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc?.map((_, radioIdx) => (
                <input
                  key={`radio-${_.id || _.title}`} /* Utilisation de event.id ou event.title pour la clé */
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Permet de changer manuellement le slide
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
