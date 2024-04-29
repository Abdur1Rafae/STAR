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
    const [topicDistribution, setTopicDistribution] = useState(JSON.parse(localStorage.getItem('TopicDistribution')) || [])
    const [incorrectQuestion, setInCorrectQuestion] = useState(JSON.parse(localStorage.getItem('MostIncorrectQuestion')) ||{})
    const [topPerformers, setTopPerformers] = useState([])
    const [absentees, setAbsentees] = useState([])
    const [requireAttention, setRequireAttention] = useState([])
    const [studentData, setStudentData] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    
    useEffect(()=> {
        const topPerformingstudents = []
        const absentstudents = []
        const requireAttentionstudents = []
        if(selectedSection == 'All') {
            participants.map((section) => {
                section.students.map((student) => {
                    if(student.response) {
                        const percentage = Math.round(student.response.totalScore / totalMarks * 100)
                        console.log(percentage)
                        if(percentage > 90) {
                            topPerformingstudents.push({
                                name: student.name,
                                section: section.sectionName,
                                score: percentage,
                                erp: student.erp,
                                response: student.response
                            })
                        }
                        else if(percentage < 60) {
                            requireAttentionstudents.push({
                                name: student.name,
                                section: section.sectionName,
                                score: percentage,
                                erp: student.erp,
                                response: student.response
                            })
                        }   
                    }
                    else {
                        absentstudents.push({
                            name: student.name,
                            section: section.sectionName,
                            score: 0,
                            erp: student.erp,
                            response: student.response
                        })
                    }
                })
            })

            setTopPerformers(topPerformingstudents)
            setAbsentees(absentstudents)
            setRequireAttention(requireAttentionstudents)
        }
        else{
            participants.map((section) => {
                if(section.sectionName == selectedSection) {
                    section.students.map((student) => {
                        if(student.response) {
                            const percentage = Math.round(student.response.totalScore / totalMarks * 100)
                            console.log(percentage)
                            if(percentage > 90) {
                                topPerformingstudents.push({
                                    name: student.name,
                                    section: section.sectionName,
                                    score: percentage,
                                    erp: student.erp,
                                    response: student.response
                                })
                            }
                            else if(percentage < 60) {
                                requireAttentionstudents.push({
                                    name: student.name,
                                    section: section.sectionName,
                                    score: percentage,
                                    erp: student.erp,
                                    response: student.response
                                })
                            }   
                        }
                        else {
                            absentstudents.push({
                                name: student.name,
                                section: section.sectionName,
                                score: 0,
                                erp: student.erp,
                                response: student.response
                            })
                        }
                    })
    
                    setTopPerformers(topPerformingstudents)
                    setAbsentees(absentstudents)
                    setRequireAttention(requireAttentionstudents)
                }    
            })
        }
    }, [selectedSection])
    
    useEffect(()=> {
        if(selectedSection == 'All') {
            setTopicDistribution(JSON.parse(localStorage.getItem('TopicDistribution')))
            const question = JSON.parse(localStorage.getItem('MostIncorrectQuestion'))
            let incorrectQuestion =  []
            assessmentQuestion.map((ques)=>{
                if(question.question == ques._id) {
                    incorrectQuestion.push({
                        question: ques.question,
                        type: ques.type,
                        options: ques.options,
                        correctOptions: ques.correctOptions,
                        image: ques.image,
                        isTrue: ques.isTrue || false,
                        percentage: Math.round(question.totalIncorrect / question.totalResponses * 100)
                    });
                }
            })

            setInCorrectQuestion(incorrectQuestion)
        }
        else {
            participants.map((section)=> {
                if(section.sectionName == selectedSection) {
                    setTopicDistribution(section.topicBreakDown)
                    setInCorrectQuestion(section.mostIncorrectQuestion)
                    const question = section.mostIncorrectQuestion
                    let incorrectQuestion =  []
                    assessmentQuestion.map((ques)=>{
                        if(question.question == ques._id) {
                            incorrectQuestion.push({
                                question: ques.question,
                                type: ques.type,
                                options: ques.options,
                                correctOptions: ques.correctOptions,
                                image: ques.image,
                                isTrue: ques.isTrue || false,
                                percentage: Math.round(question.totalIncorrect / question.totalResponses * 100)
                            });
                        }
                    })

                    setInCorrectQuestion(incorrectQuestion)
                }
            })
        }
    }, [selectedSection])

    useEffect(()=> {
        console.log(participants)
    }, [participants])

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
        <ReportContent.Provider value={{questionIndex, setQuestionIndex, topPerformers, absentees, requireAttention, incorrectQuestion, topicDistribution, scoreDistribution, avgScore, highestScore, avgResponseTime, totalParticipants, sections, selectedSection, setSelectedSection, questionCount, assessmentQuestion, setAssessmentQuestions, participants, setParticipants, totalMarks}}>
            {children}
        </ReportContent.Provider>
    )
}