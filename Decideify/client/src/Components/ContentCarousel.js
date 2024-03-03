import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import Suggestion from "./Suggestion";

export default function ContentCarousel({ filteredSuggestions }) {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 5;

  const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);

  const next = () => setIndex((prevIndex) => ((prevIndex + 1) * 5) >= filteredSuggestions.length ? 0 : prevIndex + 1);

  const previous = () => setIndex((prevIndex) => (prevIndex - 1) < 0 ? Math.floor(filteredSuggestions.length / itemsPerPage) : prevIndex - 1);

  return (
    <Carousel interval={null} activeIndex={index} onSelect={handleSelect} className="container">
      {Array.from(
        { length: Math.ceil(filteredSuggestions.length / itemsPerPage) },
        (_, carouselPage) => (
          <CarouselItem key={carouselPage}>
            <div className="row">
              {filteredSuggestions
                .slice(carouselPage * itemsPerPage, (carouselPage + 1) * itemsPerPage)
                .map((suggestion) => (
                  <div className="col" key={suggestion.id}>
                    <Suggestion userSugg={suggestion} />
                  </div>
                ))}
            </div>
          </CarouselItem>
        )
      )}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}
