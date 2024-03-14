// import React, { useEffect, useState } from 'react';

// import ImageCard from './components/ImageCard';
// import ImageSearch from './components/ImageSearch';

// function App() {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [term, setTerm] = useState('');

//   useEffect(() => {
//     fetch(`https://pixabay.com/api/?key=${process.env.VITE_API_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
//       .then(res => res.json())
//       .then(data => {
//         setImages(data.hits);
//         console.log(data.hits)
//         setIsLoading(false);
      
//       })
//       .catch(err => {
//         console.error('Error fetching images:', err);
//         setIsLoading(false);
//       });
      
//   }, [term]);

//   return (
//     <div className="container mx-auto">
     
//       <ImageSearch searchText={(text) => setTerm(text)} />

//       {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

//       {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
//         {images.map(image => (
//           <ImageCard key={image.id} image={image} />
//         ))}
//       </div>}
//     </div>
//   );
// }
// export default App;
import React, { useEffect, useState } from 'react';

import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/?key=${process.env.VITE_APP_PIXABAY_API_KEY }&q=${term}&image_type=photo`);
        setImages(response.data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
       
      }
    };

    fetchImages();
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
