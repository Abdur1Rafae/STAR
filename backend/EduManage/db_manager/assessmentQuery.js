const QUERY = 
{
    CREATE_ASSESSMENT : 'SET @participantCount = (SELECT COUNT(StudentID) FROM Enrollment WHERE SectionID IN (?)); Insert into Assessment (TeacherID, RepoID, OpenDate, Duration, CloseDate, AdaptiveTesting, Monitoring, InstantFeedback, Navigation, Title, Description, ReleaseGrades, ViewSubmission, RandomizeQuestions, RandomizeAnswers, FinalScore, CoverImage, Marks, Questions, Participants) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @participantCount); SET @assessmentId = LAST_INSERT_ID(); INSERT INTO TargetAudience (AssessmentID, SectionID) VALUES ',
    UPDATE_ASSESSMENT : 'Select CoverImage from Assessment where AssessmentID = ?; Update Assessment set RepoID = ? , OpenDate = ? , Duration = ? , CloseDate = ? , AdaptiveTesting = ? , Monitoring = ? , InstantFeedback = ? , Navigation = ? , Title = ? , Description = ? , ReleaseGrades = ? , ViewSubmission = ? , RandomizeQuestions = ? , RandomizeAnswers = ? , FinalScore = ? , CoverImage = ? , Marks = ?, Questions = ? where AssessmentID = ?;',
    DELETE_ASSESSMENT : 'Select CoverImage from Assessment where AssessmentID = ?; Delete from Assessment where AssessmentID = ?',
    
    GET_SCHEDULED_ASSESSMENTS : 'Select AssessmentID, OpenDate, CloseDate, Duration, Participants, Marks, Questions, CoverImage, CASE WHEN OpenDate <= NOW() AND CloseDate >= NOW() THEN "In Progress" WHEN OpenDate > NOW() THEN "Not Started" ELSE "Requires Grading" END AS Status from Assessment where TeacherID = ? AND (Assessment.Status != "Published" OR Assessment.Status is NULL)',
    GET_PUBLISHED_ASSESSMENTS : 'Select OpenDate, CloseDate, Duration, Participants, Marks, Questions from Assessment where TeacherID = ? AND Status = "Published" ',
    
    GET_ASSESSMENT_DETAILS : 'Select * from Assessment where AssessmentID = ?',

    GET_UPCOMING_ASSESSMENTS : 'SELECT OpenDate, Title, ClassName, CloseDate, Duration, Marks, Questions From Assessments Join Enrollment using (SectionID) where StudentID = ? AND Status COLLATE utf8mb4_unicode_ci= "Not Started"',
    GET_ONGOING_ASSESSMENTS : "SELECT  AssessmentID,Title, OpenDate, CloseDate, Duration, Marks, Questions, CoverImage, ClassName From Enrollment JOIN Assessments using (SectionID) where Status COLLATE utf8mb4_unicode_ci= 'In Progress' AND StudentID = ?  "
}

module.exports = QUERY