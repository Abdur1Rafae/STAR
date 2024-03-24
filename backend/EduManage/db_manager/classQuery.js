const QUERY = 
{
    INSERT_CLASS : 'Insert into Class (ClassName, TeacherID) VALUES (?, ?)',
    DELETE_CLASS : 'Delete from Class where ClassID = ?',
    UPDATE_CLASS : 'Update Class set ClassName = ? where ClassID = ?',
    INSERT_SECTION : 'Insert into Section (SectionName, ClassID) VALUES (?, ?)',
    DELETE_SECTION : 'Delete from Section where SectionID = ?',
    UPDATE_SECTION : 'Update Section set sectionName = ? where SectionID = ?',
    ADD_STUDENTS : 'Insert IGNORE into user (Email, FirstName, LastName, Role, ERP) VALUES ?; Insert IGNORE into Enrollment (SectionID, StudentID) VALUES ?;',
    REMOVE_STUDENT : 'Delete from Enrollment where StudentID = ? AND SectionID = ?',
    GET_ROSTER : 'SELECT CONCAT(u.FirstName, " ", u.LastName) AS Name, u.Email, u.ERP FROM User u JOIN Enrollment e ON e.StudentID = u.Email WHERE e.SectionID = ?',
    GET_CLASSES : 'Select ClassID, ClassName, JSON_ARRAYAGG(JSON_OBJECT("SectionID", SectionID, "SectionName", SectionName)) AS Sections from Class LEFT JOIN Section using(ClassID) where TeacherID = ? GROUP BY ClassName, ClassID;',

    GET_ENROLLED_CLASSES : 'SELECT SectionID, ClassName, Count(AssessmentID) As Assessments FROM Arete.Enrollment JOIN Assessments using (SectionID) where StudentID = ? GROUP BY ClassName, SectionID;'
}

module.exports = QUERY