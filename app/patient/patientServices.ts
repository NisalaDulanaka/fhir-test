import { R4 } from '@ahryman40k/ts-fhir-types';
import { either as E } from 'fp-ts';

const baseUrl = 'http://localhost:8080/api/v1/patient';

export const getPatients = async () :Promise<R4.IPatient[]> => {
    return await fetch(`${baseUrl}`)
        .then(res => {
            if (!res.ok) {
                console.log(res);
                return [];
            }

            return res.json();
        })
        .then(json => {
            if (!json) return [];

            const resultsArray: R4.IPatient[] = new Array();
            json.forEach((resource: any) => {
                let result = R4.RTTI_Patient.decode(resource);

                if (! E.isLeft(result)) resultsArray.push(result.right);
            });

            return resultsArray;
        });
};

export const searchPatients = async (query: string) :Promise<R4.IPatient[]> => {
    return await fetch(`${baseUrl}/search?q=${query}`)
        .then(res => {
            if (!res.ok) {
                console.log(res);
                return [];
            }

            return res.json();
        })
        .then(json => {
            if (!json) return [];

            const resultsArray: R4.IPatient[] = new Array();
            json.forEach((resource: any) => {
                let result = R4.RTTI_Patient.decode(resource);

                if (! E.isLeft(result)) resultsArray.push(result.right);
            });

            return resultsArray;
        });
};