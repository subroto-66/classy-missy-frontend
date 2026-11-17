import brand1 from "../assets/home/brand/b1.jpg";
import brand2 from "../assets/home/brand/b2.jpg";
import brand3 from "../assets/home/brand/b3.jpg";
import brand4 from "../assets/home/brand/b4.jpg";

const brands = [
  { name: "CeraVe", image: brand4 },
  { name: "Paula's Choice", image: brand1 },
  { name: "PanOxyl", image: brand2 },
  { name: "The Ordinary", image: brand3 },
];

export default brands.sort((a, b) => a.name.localeCompare(b.name));
