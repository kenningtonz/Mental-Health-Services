// https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b

function importAll(r) {
    let images = {};
r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
return images;
}

export const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));