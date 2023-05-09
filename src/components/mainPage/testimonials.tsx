import React, { useEffect } from 'react';
import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import "../../styles/testimonials.css"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { SectionWrapperLeft } from '../sectionAnimation';

// Add the Swiper modules you want to use
Swiper.use([Navigation]);

type Testimonial = {
  title: string;
  content: string;
  author: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      title: 'Lorem ipsum dolor sit amet.',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
      author: 'Eddie Murphy',
    },
    {
        title: 'Lorem ipsum dolor sit amet.',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
        author: 'Johan Johanson',
      },
      {
        title: 'Lorem ipsum dolor sit amet.',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
        author: 'John Doe',
      },
      {
        title: 'Lorem ipsum dolor sit amet.',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
        author: 'Piotr Rodzen',
      },
      {
        title: 'Lorem ipsum dolor sit amet.',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
        author: 'You Yourself',
      },
      {
        title: 'Lorem ipsum dolor sit amet.',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque recusandae dolorum porro, quasi sunt necessitatibus dolorem ab laudantium vel.',
        author: 'Me Meself',
      },
    // Add more testimonials as needed
  ];

  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      autoplay: {
        delay: 8000,
      },
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          centeredSlides: true,
        },
        1024: {
          centeredSlides: false,
          slidesPerView: 2.25,
        },
      },
    });
  }, []);
  return (
    <section className=" overflow-hidden  testimonials mt-60">
      <div className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8 ">
        <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
          <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl text-white">
            Read trusted reviews from our customers
          </h2>
          <div className="mt-8 flex gap-4 lg:mt-0">
            <button className="prev-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white">
              <span className="sr-only">Previous Slide</span>
              <BsFillCaretLeftFill />
            </button>
            <button className="next-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white">
              <span className="sr-only">Next Slide</span>
              <BsFillCaretRightFill />
            </button>
          </div>
        </div>
        <div className="swiper-container mt-12">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="swiper-slide p-6">
                <div className="bg-white shadow-md p-8 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">{testimonial.title}</h3>
                  <p className="text-gray-600 mb-6">{testimonial.content}</p>
                  <p className="text-lg font-semibold">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
            }  

export default SectionWrapperLeft(Testimonials, "");
