"use client";
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

const Recruteur = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [location, setLocation] = useState<string>("");
    const [workExperiences, setWorkExperiences] = useState<number>(0);
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedValues, setSelectedValues] = useState<any[]>([]); 

    const handleLanguagesChange = (selectedLanguages: string[]) => {
        setLanguages(selectedLanguages);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Skills:", skills);
        console.log("Location:", location);
        console.log("WorkExperiences:", workExperiences);
        console.log("Languages:", languages);
    };

    const languagesOptions = [
        { label: 'Arabe', value: 'Arabe' },
        { label: 'Français', value: 'Français' },
        { label: 'Anglais', value: 'Anglais' },
        { label: 'Italien', value: 'Italien' },
        { label: 'Espagnol', value: 'Espagnol' },
        { label: 'Russe', value: 'Russe' },
        { label: 'Bengali', value: 'Bengali' },
        { label: 'Portugais', value: 'Portugais' },
        { label: 'Chinois', value: 'Chinois' }
    ];

    const Skillsoptions = {
        displayValue: 'key',
        groupBy: 'cat',
        onKeyPressFn: () => {},
        onRemove: () => {},
        onSearch: () => {},
        onSelect: () => {},
        options: [
            { cat: 'Programming', key: 'Python' },
            { cat: 'Programming', key: 'Java' },
            { cat: 'Programming', key: 'C++' },
            { cat: 'Web Development', key: 'React' },
            { cat: 'Web Development', key: 'JavaScript' },
            { cat: 'Web Development', key: 'CSS' },
            { cat: 'Web Development', key: 'HTML' },
            { cat: 'Web Development', key: 'Vue.js' },
            { cat: 'Cloud Computing', key: ' Amazon Web Services (AWS)' }, 
            { cat: 'Cloud Computing', key: 'Microsoft Azure' },
            { cat: 'Cloud Computing', key: 'Google Cloud Platform (GCP)' },
            { cat: 'Artificial Intelligence', key: 'TensorFlow' },
            { cat: 'Artificial Intelligence', key: ' PyTorch' },
            { cat: 'Operating Systems', key: 'Linux/Unix' },
            { cat: 'Operating Systems', key: 'Windows' },
            { cat: 'Mobile App Development', key: 'Swift (iOS)' },
            { cat: 'Mobile App Development', key: ' Kotlin (Android)' },
            { cat: 'Mobile App Development', key: 'Flutter' },
            { cat: 'Mobile App Development', key: 'React Native' }
        ],
        showCheckbox: true
    };

    const onSelect = (selectedList: any, selectedItem: any) => {
        setSelectedValues(selectedList);
        console.log('Selected List:', selectedList);
        console.log('Selected Item:', selectedItem);
    };

    const onRemove = (selectedList: any, removedItem: any) => {
        setSelectedValues(selectedList);
        console.log('Selected List after removal:', selectedList);
        console.log('Removed Item:', removedItem);
    };

    return (
        <div className="container mx-auto flex justify-start mt-5">
            <div className="w-full max-w-xl">
                <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="languages" className="block text-gray-700 font-medium mb-2">
                            Languages
                        </label>
                        <Multiselect
                            options={languagesOptions}
                            selectedValues={selectedValues}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="label"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="workExperiences" className="block text-gray-700 font-medium mb-2">
                            Work Experiences
                        </label>
                        <input
                            id="workExperiences"
                            type="number"
                            placeholder="Enter work experiences demanded"
                            value={workExperiences}
                            onChange={(e) => setWorkExperiences(parseInt(e.target.value))}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Skills" className="block text-gray-700 font-medium mb-2">
                            Skills
                        </label>
                        <Multiselect
                            options={Skillsoptions.options}
                            displayValue={Skillsoptions.displayValue}
                            groupBy={Skillsoptions.groupBy}
                            onKeyPressFn={Skillsoptions.onKeyPressFn}
                            onRemove={Skillsoptions.onRemove}
                            onSearch={Skillsoptions.onSearch}
                            onSelect={Skillsoptions.onSelect}
                            showCheckbox={Skillsoptions.showCheckbox}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Recruteur;

