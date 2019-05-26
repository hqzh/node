import bigFish from './1835.jpg'
import styles from  './index.scss';

const img = new Image();
img.src = bigFish;
img.classList.add(styles.fish);

const root = document.getElementById('root');
console.log(root)
root.append(img)