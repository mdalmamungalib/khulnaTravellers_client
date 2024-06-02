import React, { useEffect, useState } from 'react';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Loader/Loader';
import UseHelmetTitle from '../../../Hooks/UseHelmetTitle';

const Gallery = () => {
   const [axiosSecure] = useAxiosSecure();

   const {
      data: banners = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
        const res = await axiosSecure.get("/allGallery");
        return res.data;
      },
    });

   const onInit = () => {
      console.log('lightGallery has been initialized');
  };

  if(isLoading){
   return <Loader/>
  }
   return (
      <div className="container px-4 max-w-screen-2xl mx-auto mt-32">
         <UseHelmetTitle title={"Gallery"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((banner, index) => (
         <div className="App" key={index}>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                <Link to={banner?.imageURL}>
                <img alt="img1" src={banner?.imageURL} />
                </Link>
                    
                
            </LightGallery>
        </div>
        ))}
      </div>
    </div>
   );
};

export default Gallery;