import React, { useState } from "react";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import Suggestion from "./Suggestion";

export default function ContentCarousel ({ filteredSuggestions }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === filteredSuggestions.length - 1 ? 0: prevIndex + 1));
  };

  const previous = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1));
  };

  return (
    <Carousel interval={null} activeIndex={index} onSelect={handleSelect} next={next} previous={previous} className="container">
      {filteredSuggestions.map((suggestion) => (
        <CarouselItem key={suggestion.id}>
          <Suggestion userSugg={suggestion} />
        </CarouselItem>
      ))}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};
