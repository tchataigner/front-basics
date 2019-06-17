export function processTransaction(tx, web3) {
    let i = 0, promise = new Promise((resolve, reject) => {
        tx
            .once('transactionHash', async function(hash) {
                let receiptInt = setInterval(async function () {
                    let receipt = await web3.eth.getTransactionReceipt(hash);

                    if (receipt) {
                        clearInterval(receiptInt);
                        resolve({statusCode: 200, error: null, receipt});
                    } else if (i === 14) {
                        clearInterval(receiptInt);
                        reject({statusCode: 404, error: "Not Found", receipt: null});
                    }
                    i++;
                }, 1000);
            })
            .catch((error) => {
                return reject({statusCode: 400, error: null, receipt: null});
            });
    });
    return promise.then(data => {
        return [null, data];
    }).catch(err => [err]);
}