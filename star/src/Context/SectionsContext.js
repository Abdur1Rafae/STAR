import React, { createContext, useState } from 'react';

export const SectionContext = createContext()

export const SectionProvider = ({children}) => {
    const [sections, setSections] = useState([])
    const [selectedSections, setSelectedSections] = useState([])

    const toggleSection = (section) => {
        const sectionExists = selectedSections.some(item => item._id === section._id);
        if (sectionExists) {
            const updatedSections = selectedSections.filter(item => item._id !== section._id);
            setSelectedSections(updatedSections);
        } else {
            setSelectedSections([...selectedSections, section]);
        }
    };

    const saveSections = () => {
        const newSections = selectedSections.filter(selectedSection => !sections.some(section => section._id === selectedSection._id));
        const updatedSections = sections.filter(section => selectedSections.some(selectedSection => selectedSection._id === section._id));
        setSections([...updatedSections, ...newSections]);
    }

    const removeSection = (section) => {
        const updatedSections = sections.filter((item)=> item._id !== section)
        setSections(updatedSections)
    }

    return (
        <SectionContext.Provider
          value={{ sections, selectedSections, toggleSection, saveSections, removeSection }}
        >
          {children}
        </SectionContext.Provider>
      );
}