const QUERY = 
{
    INSERT_TEACHER : 'Insert into User (FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, "Teacher")',
    INSERT_STUDENT : 'Insert into User (FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, "Student") ON DUPLICATE KEY UPDATE FirstName = VALUES(FirstName), LastName = VALUES(LastName), Password = VALUES(Password)',
    CHECK_STUDENT : 'Select Password FROM User WHERE Email = ? and Password is not null',
    FETCH_USER : 'Select Role, Password, FirstName, Verified from User where Email = ?',
    FETCH_TOKEN : 'Select refreshToken from SessionInfo where Email = ?',
    FETCH_UUID : 'Select uuid from SessionInfo where uuid = ?',
    INSERT_TOKEN : 'Insert into SessionInfo (email, refreshToken, uuid, created_at) VALUES (?, ?, ?, Now()) ON DUPLICATE KEY UPDATE refreshToken = VALUES(refreshToken), uuid = VALUES(uuid), created_at = Now()',
    REMOVE_TOKEN : 'Delete from SessionInfo where email = ?',
    SAVE_OTP : 'Insert into PasswordReset (email, otp) VALUES (?, ? ) ON DUPLICATE KEY UPDATE otp = VALUES(otp), created_at = Now()',
    UPDATE_USER : 'Update User set FirstName = ?, LastName = ?, Password = ? where Email = ?',
    DELETE_TEACHER : 'Delete from User where Email = ?',
    DELETE_STUDENT : 'Update User Set Password = null where Email = ?',
    VERIFY_OTP : 'Select * from PasswordReset where email = ? AND otp = ?',
    UPDATE_PASSWORD : 'Update User set Password = ? where Email = ?',
    MARK_VERIFIED : 'Update User set Verified = 1 where Email = ?'
}

module.exports = QUERY