function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, time);
  })
}

async function test() {
  await delay(3000);
  console.log('it works');
}

test();
