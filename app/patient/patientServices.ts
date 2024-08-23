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
            if (!json.entry) return [];

            return json.entry.reduce((filtered: Object[], currentEntry: any) => {
                let result = R4.RTTI_Patient.decode(currentEntry.resource);

                if (! E.isLeft(result)) filtered.push(result.right);

                return filtered;
            }, []);
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
            if (!json.entry) return [];

            return json.entry.reduce((filtered: Object[], currentEntry: any) => {
                let result = R4.RTTI_Patient.decode(currentEntry.resource);

                if (! E.isLeft(result)) filtered.push(result.right);

                return filtered;
            }, []);
        });
};