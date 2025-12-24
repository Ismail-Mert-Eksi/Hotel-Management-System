const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Modelleri import et
const User = require('./models/User');
const Room = require('./models/Room');

// Ortam değişkenlerini yükle
dotenv.config();

const seedData = async () => {
  try {
    // Veritabanına bağlan
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı!');

    // Mevcut veriyi temizle (isteğe bağlı)
    
    await Room.deleteMany();

    
    // Oda verilerini ekle
    const room_data = [
      {
          "roomNumber": "101",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Cozy single room with modern amenities.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "102",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Spacious double room with a beautiful balcony view.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "103",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with premium facilities and a stunning view.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "104",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Comfortable single room with a smart TV and free Wi-Fi.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "105",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Elegant double room with a balcony and modern decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "106",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with a private jacuzzi and mini-bar.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "107",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Cozy single room with a balcony and free Wi-Fi.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "108",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Spacious double room with modern amenities.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "109",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with a balcony and premium facilities.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "110",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Comfortable single room with a smart TV and modern decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "111",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Elegant double room with a balcony and scenic view.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "112",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with a jacuzzi and premium features.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "113",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Cozy single room with balcony and free Wi-Fi.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "114",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Spacious double room with air conditioning and modern decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "115",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with exclusive facilities and a stunning view.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "116",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Comfortable single room with a smart TV and premium decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "117",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Elegant double room with a balcony and scenic views.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "118",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with exclusive facilities and a breathtaking view.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "119",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Cozy single room with a balcony and modern features.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "120",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Spacious double room with modern decor and scenic views.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "121",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with a jacuzzi and premium features.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "122",
          "type": "single",
          "price": 100,
          "capacity": 1,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_2-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/FRENCH_1+1-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/AILE+ODASI3-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/QUEEN_-1920w.jpg"],
          "description": "Comfortable single room with modern amenities and decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "123",
          "type": "double",
          "price": 200,
          "capacity": 2,
          "isAvailable": true,
          "features": ["Shower", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/25-FAMILY+ROOM-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/26-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/27-FAMILY+ROOM-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/22-STANDARD-1920w.jpg"],
          "description": "Elegant double room with premium features and decor.",
          "createdAt": "2024-12-31"
      },
      {
          "roomNumber": "124",
          "type": "suite",
          "price": 300,
          "capacity": 4,
          "isAvailable": true,
          "features": ["Jacuzzi", "Balcony", "Air Conditioning", "Tv"," Sitting Area", "Minibar", "7/24 Room Service", "Hair Dryer", "Wifi"],
          "imageUrls": ["https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/33-KING+SUIT-1920w.jpg", "https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/31-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/32-HANDICAPPED-1920w.jpg","https://lirp.cdn-website.com/11191c87/dms3rep/multi/opt/35-KING+SUIT-1920w.jpg"],
          "description": "Luxury suite with stunning views and exclusive facilities.",
          "createdAt": "2024-12-31"
      }
  ]
  
  
    await Room.insertMany(room_data);
    console.log('Odalar başarıyla eklendi!');

    // Bağlantıyı kapat
    mongoose.disconnect();
    console.log('Seed işlemi tamamlandı ve bağlantı kapatıldı.');
  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error.message);
    process.exit(1); // Hata durumunda script'i durdur
  } 
};

seedData();
