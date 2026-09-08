console.log("Start")
fetch('https://656ca88ee1e03bfd572e9c16.mockapi.io/products')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

console.log("End")