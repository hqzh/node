import bigFish from './1835.jpg'
import './index.scss';

const img = new Image();
img.src = bigFish;
img.classList.add('fish');

const root = document.getElementById('root');
console.log(root)
root.append(img)