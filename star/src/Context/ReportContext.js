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
    const [questionData, setQuestionData] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionStats, setQuestionStats] = useState({})
    const [allQuestionPercent, setAllQuestionPercent] = useState([])

    useEffect(()=>{
        if(questionData.length > 0){
            if(selectedSection == 'All') {
                const compiledData = [];

                questionData.forEach((section, sectionIndex) => {
                    section.questions.forEach((question, questionIndex) => {
                        const existingQuestionIndex = compiledData.findIndex(item => item.question === question.question);
                        
                        if (existingQuestionIndex !== -1) {
                            compiledData[existingQuestionIndex].totalResponses += question.totalResponses;
                            compiledData[existingQuestionIndex].totalCorrect += question.totalCorrect;
                        } else {
                            const newData = {
                                question: question.question,
                                totalResponses: 0,
                                totalCorrect: 0
                            };
                            newData.totalResponses = question.totalResponses;
                            newData.totalCorrect = question.totalCorrect;
                            compiledData.push(newData);
                        }
                    });
                });
                setAllQuestionPercent(compiledData)
            }
            else {
                const compiledData = [];

                questionData.forEach((section, sectionIndex) => {
                    if(section.section == selectedSection) {
                        section.questions.forEach((question, questionIndex) => {
                            const newData = {
                                question: question.question,
                                totalResponses: 0,
                                totalCorrect: 0
                            };
                            newData.totalResponses = question.totalResponses;
                            newData.totalCorrect = question.totalCorrect;
                            compiledData.push(newData);
                        });
                    }
                });
                setAllQuestionPercent(compiledData)
            }
        }
    }, [selectedSection, questionData])

    useEffect(()=>{
        let stats ={}
        if(questionData.length > 0){
            if(selectedSection == 'All') {
                let totalResponses = 0;
                let totalSkipped = 0
                let correctResponses = 0;
                let avgResponseTime = 0;
                let options = []
                let highestScore = 0
                let avgScore = 0
                let totalScore =0
                questionData.map((section)=>{
                    const qId = assessmentQuestion[questionIndex]._id
                    totalScore = assessmentQuestion[questionIndex].points
                    
                    section.questions.map((question)=>{
                        if(question.question == qId) {
                            totalResponses += question.totalResponses
                            totalSkipped += question.totalSkipped
                            correctResponses += question.totalCorrect
                            avgResponseTime += question.averageResponseTime
                            if(highestScore < question.highestScore){
                                highestScore = question.highestScore
                            }
                            avgScore += question.averageScore
                            if(question.optionsBreakDown) {
                                options = options.concat(question.optionsBreakDown)
                            }
                        }
                    })
                })
                avgResponseTime = (avgResponseTime/questionData.length)
                avgScore = Math.round(avgScore/questionData.length)

                const countMap = new Map();

                options.forEach(item => {
                    const { option, count } = item;
                    if (countMap.has(option)) {
                        countMap.set(option, countMap.get(option) + count);
                    } else {
                        countMap.set(option, count);
                    }
                });

                const mergedArray = Array.from(countMap, ([option, count]) => ({ option, count }));
                stats = {
                    totalResponses: totalResponses,
                    totalSkipped: totalSkipped,
                    totalCorrect: correctResponses,
                    highestScore: highestScore,
                    avgScore: avgScore,
                    avgResponseTime: secondsToHMS(avgResponseTime),
                    options: mergedArray,
                    totalScore: totalScore
                }
                setQuestionStats(stats)
            }
            else {
                let totalResponses = 0;
                let totalSkipped = 0
                let correctResponses = 0;
                let avgResponseTime = 0;
                let options = []
                let highestScore = 0
                let avgScore = 0
                let totalScore =0
                questionData.map((section)=>{
                    const qId = assessmentQuestion[questionIndex]._id
                    totalScore = assessmentQuestion[questionIndex].points
                    if(section.section == selectedSection) {
                        section.questions.map((question)=>{
                            if(question.question == qId) {
                                totalResponses += question.totalResponses
                                totalSkipped += question.totalSkipped
                                correctResponses += question.totalCorrect
                                avgResponseTime += question.averageResponseTime
                                if(highestScore < question.highestScore){
                                    highestScore = question.highestScore
                                }
                                avgScore += question.averageScore
                                if(question.optionsBreakDown) {
                                    options = options.concat(question.optionsBreakDown)
                                }
                            }
                            
                        })
                    }        
                })
                avgResponseTime = (avgResponseTime/questionData.length)
                avgScore = Math.round(avgScore/questionData.length)

                stats = {
                    totalResponses: totalResponses,
                    totalSkipped: totalSkipped,
                    totalCorrect: correctResponses,
                    highestScore: highestScore,
                    avgScore: avgScore,
                    avgResponseTime: secondsToHMS(avgResponseTime),
                    options: options,
                    totalScore: totalScore
                }
                setQuestionStats(stats)
            }
        }
    }, [questionIndex, selectedSection, questionData])
    
    useEffect(()=> {
        const topPerformingstudents = []
        const absentstudents = []
        const requireAttentionstudents = []
        if(selectedSection == 'All') {
            participants.map((section) => {
                section.students.map((student) => {
                    if(student.response) {
                        const percentage = Math.round(student.response.totalScore / totalMarks * 100)
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
            if(question !== null) {
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
        }
        else {
            participants.map((section)=> {
                if(section.sectionName == selectedSection) {
                    setTopicDistribution(section.topicBreakDown)
                    setInCorrectQuestion(section.mostIncorrectQuestion)
                    const question = section.mostIncorrectQuestion
                    console.log(question)
                    let incorrectQuestion =  []
                    if(question !== null) {
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
                }
            })
        }
    }, [selectedSection])

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

    useEffect(()=>{
        const newSections = []
        let totalStudentsCount = 0
        let responseTime = 0;
        let meanScore = 0;
        let highScore = 0;
        participants.map((section)=>{
            newSections.push(section.sectionName)
            console.log(section)
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
        <ReportContent.Provider value={{allQuestionPercent, questionStats, questionData, setQuestionData, questionIndex, setQuestionIndex, topPerformers, absentees, requireAttention, incorrectQuestion, topicDistribution, scoreDistribution, avgScore, highestScore, avgResponseTime, totalParticipants, sections, selectedSection, setSelectedSection, questionCount, assessmentQuestion, setAssessmentQuestions, participants, setParticipants, totalMarks}}>
            {children}
        </ReportContent.Provider>
    )
}