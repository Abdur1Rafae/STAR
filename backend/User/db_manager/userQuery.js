const QUERY = 
{
    INSERT_TEACHER : 'INSERT INTO User (FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, "Teacher")',
    INSERT_STUDENT : 'INSERT INTO User (FirstName, LastName, Email, Password, ERP, Role) VALUES (?, ?, ?, ?, ?, "Student")',
    FETCH_USER : 'Select Password from User where Email = ? AND Role = ?',
    FETCH_TOKEN : 'Select refreshToken from SessionInfo where Email = ?',
    FETCH_UUID : 'Select uuid from SessionInfo where uuid = ?',
    INSERT_TOKEN : 'Insert into SessionInfo (email, refreshToken, uuid, created_at) VALUES (?, ?, ?, Now()) ON DUPLICATE KEY UPDATE refreshToken = VALUES(refreshToken), uuid = VALUES(uuid), created_at = Now()'
}

module.exports = QUERY