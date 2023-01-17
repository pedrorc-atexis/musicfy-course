import React, { useEffect, useRef, useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Slick from "react-slick";
import { map } from "lodash";
import { Link } from "react-router-dom";
import "./Slider.scss";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  swipeToSlide: true,
  centerMode: true,
};

export function Slider({ data, basePath }) {
  return (
    <Slick {...settings} className="slider">
      {map(data, (item) => {
        return (
          <Link
            to={`/${basePath}/${item.id}`}
            key={item.id}
            className="slider__item"
          >
            <Image src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </Link>
        );
      })}
    </Slick>
  );
}

{
  /* <div key={item.id} className="slider__item">
            <div className="slider__item-block-plau">
              <Image src={item.image} alt={item.name} />
              <Icon name="play circle outline" />
            </div>
            <h3>{item.name}</h3>
          </div> */
}
