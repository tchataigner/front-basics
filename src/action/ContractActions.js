import {processTransaction} from "../utils/utils";

// Export Constants
export const EXAMPLE = 'EXAMPLE';
export const ERROR = 'ERROR';

// Export Actions
export function eventPostContract(data, from) {
    return {
        type: EXAMPLE,
        data,
        from
    };
}

export function eventResponseContract(statusCode, error, message, from) {
    return {
        type: ERROR,
        statusCode,
        error,
        message,
        from
    };
}

export function postContract() {
    return async (dispatch, getState) => {
        let err, data;

        const {web3, contract} = getState().app;

        const account = (await web3.eth.getAccounts())[0];

        [err, data] = await processTransaction(
            contract.methods
                .test(
                    "aaaaaa",
                    0
                ).send({from: account, gasPrice: 0}),
            web3
        );

        if (err) {
            dispatch(
                eventResponseContract(
                    400,
                    "Bad Request",
                    "L'envoi des données de l'événement sur la blockchain a échoué. Veuillez vérifier toutes vos entrées avant de renvoyer le formulaire",
                    "postContract"
                )
            );
            return;
        } else if (!data.receipt.status) {
            dispatch(
                eventResponseContract(
                    400,
                    "Bad Request",
                    "Erreur de traitement de vos données par la blockchain. Veuillez vérifier toutes vos entrée avant de renvoyer le formulaire",
                    "postContract"
                )
            );
            return;
        }

        dispatch(
            eventPostContract("data", "postContract")
        );
        return;
    }
}