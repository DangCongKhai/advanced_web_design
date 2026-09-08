function first() {
    console.log('First');
}
function sleep(ms) {
  const sab = new SharedArrayBuffer(4);
  const int32 = new Int32Array(sab);
  // Atomics.wait blocks execution until a condition is met or it times out
  Atomics.wait(int32, 0, 0, ms);
}

function second() {
    console.log('Second');
}

function third() {
    // Sleep for 3 seconds
    sleep(3000);
    console.log('Third');
}

first();
setTimeout(() => {
    second();
}, 1000);
third();
