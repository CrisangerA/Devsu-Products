export function simulateNetworkRequest() {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    setTimeout(() => {
      resolve('Network request successful');
    }, delay);
  });
}
