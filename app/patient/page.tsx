'use client'

import { R4 } from '@ahryman40k/ts-fhir-types';
import * as patientServices from './patientServices';
import { Search } from "@mui/icons-material";
import TuneIcon from '@mui/icons-material/Tune';
import { useEffect, useState } from "react";
import { Avatar } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import styles from './patient-styles.module.css';

export default function PatientTab() {
    const [searchInput, setSearchInput] = useState<undefined | string>(undefined);
    const [patients, setPatients] = useState<R4.IPatient[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const search = async () => {
        setIsLoading(true);
        let results;
        if (!searchInput || searchInput == '') 
            results = await patientServices.getPatients();
        else
            results = await patientServices.searchPatients(searchInput);

        setIsLoading(false);
        setPatients(results);
    }
    
    useEffect(() => { search(); }, []);

    return (
        <div className="px-4">
            <h1 className="mt-8 text-2xl">Patients</h1>

            <div className="flex items-end mt-8 mb-6">
                <div className="searchBar flex items-center rounded-lg overflow-hidden py-1 px-3 gap-x-2 bg-white w-fit">
                    <button onClick={() => search()}><Search className="text-[#595959]" /></button>

                    <input type="text" placeholder="Search for patient....." className="w-[176px] outline-none" value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search();
                            }
                        }}/>
                    
                    <div className="h-[23px] w-[0.5px] bg-[#888888]" />
                    <button><TuneIcon className="text-[#595959]" /></button>
                </div>
                <div className='ms-auto me-4 text-[#585858]'>Found {patients.length} patients</div>
            </div>
            <hr />
            <div className="mt-4">
            <div className={`flex flex-col rounded-lg px-4 py-2 gap-y-2 bg-[#ffffff] max-h-[590px] overflow-y-auto ${styles.patientScrollBar}`}>
            {
                isLoading? <div className='h-[200px] flex justify-center items-center'><h2>Fetching Patients...</h2></div> : (
                    patients.map((patient, index) => {
                        let patientName = "Unknown";
                        
                        if(patient.name){
                            console.log(patient.name);
                            patientName = `${patient.name[0].given?.at(0)} ${patient.name[0].family}`|| "";
                        }
    
                        return (
                            <div key={index} className="py-3 px-3 flex items-start gap-x-4 border-b border-[#dbdbdb]">
                                <div>
                                    <Avatar sx={{ bgcolor: lightBlue[500], width: 50, height: 50 }}>{patientName.charAt(0)}</Avatar>
                                </div>
                                <div>
                                    <h2>{patientName}</h2>
                                    <div className="flex gap-x-4">
                                        <span>ID : {patient.id}</span>
                                        <span>Age : {patient.birthDate}</span>
                                        <span>Gender : {patient.gender}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )
            }
        </div>
            </div>
        </div>
    )
}