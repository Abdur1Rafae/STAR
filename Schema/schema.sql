CREATE TABLE User (
    Email VARCHAR(255) PRIMARY KEY UNIQUE,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Password VARCHAR(255),
    Role ENUM('Teacher', 'Student'),
    ERP INT NULL -- Nullable for teachers
);

CREATE TABLE Class (
    ClassID INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    TeacherID VARCHAR(255),
    ClassName VARCHAR(255),
    FOREIGN KEY (TeacherID) REFERENCES User(Email)
);

CREATE TABLE Section (
    SectionID INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    SectionName VARCHAR(255),
    ClassID INT,
    FOREIGN KEY (ClassID) REFERENCES Class(ClassID)
);

CREATE TABLE Enrollment (
    SectionID INT,
    StudentID VARCHAR(255),
    PRIMARY KEY (SectionID, StudentID),
    FOREIGN KEY (SectionID) REFERENCES Section(SectionID),
    FOREIGN KEY (StudentID) REFERENCES User(Email)
);

CREATE TABLE Assessment (
    AssessmentID INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    TeacherID VARCHAR(255),
    RepoID INT,
    OpenDate TIME,
    Duration INT,
    CloseDate TIME,
    AdaptiveTesting BOOLEAN,
    Monitoring BOOLEAN,
    InstantFeedback BOOLEAN,
    Navigation BOOLEAN,
    Title VARCHAR(255),
    Description TEXT,
    ReleaseGrades BOOLEAN,
    ViewSubmission BOOLEAN,
    RandomizeQuestions BOOLEAN,
    RandomizeAnswers BOOLEAN,
    FinalScore BOOLEAN,
    CoverImage BLOB,
    FOREIGN KEY (TeacherID) REFERENCES User(Email)
);

CREATE TABLE TargetAudience (
    AssessmentID INT,
    SectionID INT,
    PRIMARY KEY (AssessmentID, SectionID),
    FOREIGN KEY (AssessmentID) REFERENCES Assessment(AssessmentID),
    FOREIGN KEY (SectionID) REFERENCES Section(SectionID)
);

CREATE TABLE SessionInfo (
    email VARCHAR(255) PRIMARY KEY,
    refreshToken VARCHAR(255) NOT NULL,
    uuid VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES User(Email)
);

CREATE TABLE PasswordReset (
    otp VARCHAR(6) NOT NULL,
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EVENT IF NOT EXISTS `Arete`.`delete_expired_tokens` 
ON SCHEDULE  
EVERY 1 minute 
DO 
DELETE FROM SessionInfo WHERE created_at  < NOW() - INTERVAL 5 minute

CREATE EVENT IF NOT EXISTS `Arete`.`delete_expired_otp` 
ON SCHEDULE  
EVERY 1 minute 
DO 
DELETE FROM SessionInfo WHERE created_at  < NOW() - INTERVAL 5 minute

Alter View Assessments As
SELECT AssessmentID, SectionID, Title, ClassName, Duration, OpenDate, CloseDate, Questions, Marks, CoverImage,
CASE WHEN OpenDate <= NOW() AND CloseDate >= NOW() THEN "In Progress" 
WHEN OpenDate > NOW() THEN "Not Started" 
WHEN Status = 'Published' THEN 'Published'
ELSE 'Under Review' 
END AS Status
FROM Assessment 
JOIN TargetAudience USING (AssessmentID) 
JOIN Section USING (SectionID) 
JOIN Class USING (ClassID);