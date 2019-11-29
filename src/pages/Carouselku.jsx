// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import carousel1 from '../supports/img/Promo.png';
// import carousel2 from '../supports/img/promo ovo.jpg'

// export default () => (
    
//     <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
//         <div>
//         <img src={carousel1} 
//         alt="Promo" width={800}  className="img-responsive" />
//         </div>
//         <div>
//         <img src={carousel2}
//         alt="Promo Ovo" width={800}  className="img-responsive" />
//         </div>
//     </Carousel>
  
// );


import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: '../images/Promo.png',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: '../images/promo ovo.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  // {
  //   src: '../images/slide03.jpg',
  //   altText: 'Slide 3',
  //   caption: 'Slide 3'
  // }
];

class Carouselku extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Carouselku;

