import React, { createContext, useState, useEffect } from 'react';
import { secondsToHMS } from '../Utils/TimeFunction';

export const ReportContent = createContext()

export const ReportProvider = ({ children }) => {
    const [assessmentQuestion, setAssessmentQuestions] = useState(JSON.parse(localStorage.getItem('ReportQuestionBank')) || [])
    const [participants, setParticipants] =useState(JSON.parse(localStorage.getItem('ReportParticipants')) || [])
    const totalMarks = localStorage.getItem('ReportAsgMarks')
    const [sections, setSections] = useState([])
    const [selectedSection, setSelectedSection] = useState('All')
    const [totalParticipants, setTotalParticipants] = useState(0)
    const [avgResponseTime, setAvgResponseTime] = useState(0)
    const [avgScore, setAvgScore] = useState(0)
    const [highestScore, setHighestScore] = useState(0)
    const [scoreDistribution, setScoreDistribution] = useState([])
    const [topicList, setTopicList] = useState({})
    const [topicDistribution, setTopicDistribution] = useState({})

    useEffect(()=> {
        const topics = {};
        
        assessmentQuestion.forEach(question => {
            if (topics.hasOwnProperty(question.question.topic)) {
            topics[question.question.topic].push(question.question._id);
            } else {
            topics[question.question.topic] = [question.question._id];
            }
        });
        setTopicList(topics)
    }, [assessmentQuestion])

    useEffect(()=> {
        if(selectedSection == 'All') {
            Object.keys(topicList).map(key => {
                topicList[key].map((question)=> {
                    participants.map((section)=> {
                        
                    })
                })
    
            });
        }
    }, [topicList, selectedSection])

    useEffect(()=>{
        const newSections = []
        let totalStudentsCount = 0
        let responseTime = 0;
        let meanScore = 0;
        let highScore = 0;
        participants.map((section)=>{
            newSections.push(section.sectionName)
            totalStudentsCount += section.responses
            responseTime += section.responseTime
            if(section.highestScore > highScore) {
                highScore = section.highestScore
            }
            meanScore += section.averageScore
        })
        setSections(newSections)
        setTotalParticipants(totalStudentsCount)
        setAvgResponseTime(secondsToHMS(responseTime / newSections.length))
        setAvgScore(meanScore/newSections.length)
        setHighestScore(highScore)
    }, [participants])

    useEffect(()=>{
        if(selectedSection == 'All') {
            let totalStudentsCount = 0
            let responseTime = 0;
            let meanScore = 0;
            let highScore = 0;
            participants.map((section)=>{
                totalStudentsCount += section.responses
                responseTime += section.responseTime
                if(section.highestScore > highScore) {
                    highScore = section.highestScore
                }
                meanScore += section.averageScore
            })
            setTotalParticipants(totalStudentsCount)
            setAvgResponseTime(secondsToHMS(responseTime / sections.length))
            setAvgScore(meanScore/ sections.length)
            setHighestScore(highScore)
        }
        else {
            let totalStudentsCount = 0
            let responseTime = 0;
            let meanScore = 0;
            let highScore = 0;
            participants.map((section)=>{
                if(section.sectionName == selectedSection) {
                    totalStudentsCount += section.responses
                    responseTime += section.responseTime
                    meanScore = section.averageScore
                    highScore = section.highestScore
                }
            })
            setTotalParticipants(totalStudentsCount)
            setAvgResponseTime(secondsToHMS(responseTime))
            setAvgScore(meanScore)
            setHighestScore(highScore)
        }
    }, [selectedSection, sections])

    useEffect(()=> {
        let scores = []
        if(selectedSection == 'All'){
            participants.map((section)=>{
                section.students.map((student) => [
                    scores.push(Math.round(((student.response ? student.response.totalScore : 0) / totalMarks) * 100))
                ])
            })
        }
        else {
            participants.map((section)=>{
                if(section.sectionName == selectedSection){
                    section.students.map((student) => [
                        scores.push(Math.round(((student.response ? student.response.totalScore : 0) / totalMarks) * 100))
                    ])
                }
            })
        }

        setScoreDistribution(scores)
    }, [selectedSection])

    const questionCount = assessmentQuestion.length

    return (
        <ReportContent.Provider value={{scoreDistribution, avgScore, highestScore, avgResponseTime, totalParticipants, sections, selectedSection, setSelectedSection, questionCount, assessmentQuestion, setAssessmentQuestions, participants, setParticipants, totalMarks}}>
            {children}
        </ReportContent.Provider>
    )
}