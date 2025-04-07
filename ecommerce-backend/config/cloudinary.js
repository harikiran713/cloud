import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: "harikiran",
        api_key: "749393451689165",
        api_secret: "qIkFYo1jautatST8xbsknzD7V_c"
    });
    console.log("✅ Cloudinary connected successfully!");
};

export { connectCloudinary };
