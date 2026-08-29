var arr = [];

function save() {

    let a = {
        name: document.getElementById('name').value,
        id: document.getElementById('id').value,
        prdname: document.getElementById('prdname').value,
        qty: document.getElementById('qty').value,
        price: document.getElementById('price').value,
    }
    
    // Find id of a in arr
    let index = arr.findIndex(function(item) {
        return item.id === a.id;
    });

    if (index !== -1) {
        alert("ID already exists. Please enter a unique ID.");
    } else {
        // If id does not exist, add the new object to the array
        arr.push(a);
    }
    show();
}

function show() {
    var html = '';
    for (i in arr) {
        var n = i;
        n++;
        html += "<tr>";
        html += "<td>" + (n) + "</td>";
        html += "<td>" + arr[i].name + "</td>";
        html += "<td>" + arr[i].id + "</td>";
        html += "<td>" + arr[i].prdname + "</td>";
        html += "<td>" + arr[i].qty + "</td>";
        html += "<td>" + arr[i].price + "</td>";
        html += "<td>" + parseFloat(arr[i].qty)*parseFloat(arr[i].price) + "</td>";
        html += "</tr>";
    }
    document.getElementById('tbl').innerHTML = html;
}

function clear() {
    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    document.getElementById('prdname').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('price').value = '';

}

function reset() {
    arr = [];
    clear();
}