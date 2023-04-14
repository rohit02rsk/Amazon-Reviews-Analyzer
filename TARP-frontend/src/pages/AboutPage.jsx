// // import React from "react";
// // import Marquee from "react-fast-marquee";

// // const AboutPage = () => {
// //   return (
// //     <>
// //       <section className="marquee-wrapper py-5">
// //         <div className="container-xxl">
// //           <div className="row">
// //             <div className="col-12">
// //               <div className="d-flex align-items-center justify-content-center">
// //                 <div className="mx-4 w-25">
// //                   <img src="images/brand-01.png" alt="brand" />
// //                 </div>
// //                 <div className="mx-4 w-25">
// //                   <img src="images/brand-02.png" alt="brand" />
// //                 </div>
// //                 <div className="mx-4 w-25">
// //                   <img src="images/brand-03.png" alt="brand" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default AboutPage;
// import React, { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";

// function AboutPage() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=First slide&bg=373940"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Second slide&bg=282c34"
//           alt="Second slide"
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Third slide&bg=20232a"
//           alt="Third slide"
//         />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// // render(<ControlledCarousel />);
// export default AboutPage;
