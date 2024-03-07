const mongoose = require('mongoose');
const Pharmacy = require('./models/Pharmacy');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const seedPharmacies = async () => {
  // Очищення бази даних
  await Pharmacy.deleteMany({});
  await Product.deleteMany({});

  // Створення тестових аптек
  const pharmacy1 = await Pharmacy.create({
    name: 'Aversi',
    description: 'The leading multi-profile medical-diagnostic institution',
    address: '1 Polytechnichna St.',
    imageUrl: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/347871679_790515832402764_7900840080648252560_n.png?stp=dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CHlyscyjU-MAX-MeKeV&_nc_ht=scontent.ftbs6-2.fna&oh=00_AfCvBwXs2pQa-Vy6BobGrCOQo-X6JmuBOyw70eByHvZNLQ&oe=65EFC7E5"
  });

  const pharmacy2 = await Pharmacy.create({
    name: 'PSP',
    description: 'Georgian pharmacy',
    address: '34 Khinkali St.',
    imageUrl: "https://psp.ge/cover.jpg"
  });

  // Створення тестових продуктів
  const now = new Date();
  const product1 = new Product({
    name: 'Paracetamol',
    description: 'I am paracetamol, good medicine.',
    price: 10,
    imageUrl: "https://www.pharmacyonline.co.uk/uploads/images/products/large/pharmacy-online-paracetamol-paracetamol-500mg-100-tablets-1602960473paracetamol-1.jpg"
  });

  const product2 = new Product({
    name: 'Citramon',
    description: 'Citramon is a great pill to reduce headache',
    price: 15,
    imageUrl: "https://mkurnali.ge/media/images/new_images/wamali/citramoni.jpg",
    createdAt: new Date(now.getTime() - 5000)
  });

  const product3 = new Product({
    name: 'Activated charcoal',
    description: 'Medicine for your stomach',
    price: 5,
    imageUrl: "https://m.media-amazon.com/images/I/61OBGqQyEfL.jpg",
    createdAt: new Date(now.getTime() - 5000)
  });

  const product4 = new Product({
    name: 'Product 4',
    description: 'Product Description 4',
    price: 13,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9MzsUDQjrvsgeS41fUunCHDGnZrrnfyMrgmHDcganV1B41jRgGaVvxgPuBpH_orBFyg&usqp=CAU",
    createdAt: new Date(now.getTime() - 10000)
  });

  const product5 = new Product({
    name: 'Product 5',
    description: 'It is a very long description just about nothing because the only thing i am writing it for - to be a very long description, its an aim of this product to have a very long description, so we can check if this description is visible in a modal window.',
    price: 123,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9MzsUDQjrvsgeS41fUunCHDGnZrrnfyMrgmHDcganV1B41jRgGaVvxgPuBpH_orBFyg&usqp=CAU",
    createdAt: new Date(now.getTime() - 10000)
  });


  // Прикріплення продуктів до аптеки
  pharmacy1.products.push(product1, product2, product3, product4, product5);
  await pharmacy1.save();

  console.log('Database seeded!');
};

seedPharmacies().then(() => {
  mongoose.connection.close();
});
