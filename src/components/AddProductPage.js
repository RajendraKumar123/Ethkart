// import React, { useState } from 'react';

// import './AddProductPage.css';

// function AddProductPage() {
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [stock, setStock]=useState('');
//   const [price, setPrice]=useState('');
//   const [image, setImage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     //create item object and send it to ipfs
//     const item = {
//       name: name,
//       category: category,
//       stock: stock,
//       price: price,
//       image: image,
//     };

//     // Add code to handle form submission
//   }

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.value);
//   };
//   const handleStockChange = (event) => {
//     setStock(event.target.value);
//   };
//   const handlePriceChange = (event) => {
//     setPrice(event.target.value);
//   };

//   return (
//     <div className="add-product-page">
//       <h1>Add a New Product</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter the Name of the Product:
//           <input type="text" value={name} onChange={handleNameChange} />
//         </label>
//         <label>
//           Enter the price of the Product:
//           <input type="text" value={category} onChange={handlePriceChange} />
//         </label>
//         <label>
//           Enter the stock of the Product:
//           <input type="text" value={category} onChange={handleStockChange} />
//         </label>

//         <label htmlFor="category-select">Category:</label>
//         <select id="category-select" name="category-select" onChange={handleCategoryChange}>
//           <option value="default">Select a category</option>
//           <option value="category1">Vegitables</option>
//           <option value="category2">Electronics</option>
//           <option value="category3">Toys</option>
//         </select>


//         <label>
//           Image:
//           <input type="file" value={image} onChange={handleImageChange} />
//         </label>
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// }

// export default AddProductPage;



// // import React, { useState } from "react";
// // import ipfsClient  from "ipfs-http-client";

// // const AddProductPage = () => {
// //   const [image, setImage] = useState(null);

// //   const handleImageUpload = async (e) => {
// //     e.preventDefault();
// //     const imageFile = e.target.files[0];
// //     const reader = new window.FileReader();
// //     reader.readAsArrayBuffer(imageFile);

// //     reader.onloadend = async () => {
// //       const ipfsClient = ipfsClient({
// //         host: 'ipfs.infura.io',
// //         port: 5001,
// //         protocol: 'https',
// //       });
// //       const buffer = await Buffer.from(reader.result);
// //       const result = await ipfsClient.add(buffer);
// //       console.log(result);
// //       setImage(result.path);
// //     };
// //   };

// //   return (
// //     <div>
// //       <h1>Product Details</h1>
// //       <form>
// //         <label htmlFor="image">Image:</label>
// //         <input type="file" accept="image/*" onChange={handleImageUpload} />
// //         {image && <img src={`https://ipfs.io/ipfs/${image}`} alt="product" />}
// //         <button type="submit">Save</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddProductPage;




import React, { useState } from 'react';
import { create } from 'ipfs-http-client'
import './AddProductPage.css';
// import { useHistory } from 'react-router-dom';

function AddProductPage() {
 
  // const history = useHistory();

  // const ipfs = create.create('https://ipfs.infura.io:5001');


  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create item object
    const item = {
      name,
      category,
      stock,
      price,
      image: ipfsHash, // save IPFS hash of the image
    };

    // Save item object to JSON file
    const json = JSON.stringify(item);
    const blob = new Blob([json], { type: '/' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.json`;
    link.click();
    URL.revokeObjectURL(url);

    // Upload image to IPFS
    const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });
    // const buffer = Buffer.from(image);
    // const result = await ipfs.add(buffer);
    // console.log(result.path);
    // setIpfsHash(result.path);
    // const data = JSON.stringify(item);
    
    
    
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="add-product-page">
      <h1>Add a New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the Name of the Product:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Enter the price of the Product:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <label>
          Enter the stock of the Product:
          <input type="text" value={stock} onChange={handleStockChange} />
        </label>
        <label htmlFor="category-select">Category:</label>
        <select id="category-select" name="category-select" onChange={handleCategoryChange}>
          <option value="default">Select a category</option>
          <option value="category1">Vegitables</option>
          <option value="category2">Electronics</option>
          <option value="category3">Toys</option>
        </select>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;
