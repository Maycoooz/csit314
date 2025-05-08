import unittest
from unittest.mock import Mock, patch # Mock - create fake db objects, patch - Temp replace real methods in test

# import the things I want to test and mock
from backend.controllers.login_controller import LoginController
from backend.utility.connect_to_db import ConnectDB

class TestLoginController(unittest.TestCase):

    # replace ConnectDB.connect with a mock function
    @patch.object(ConnectDB, 'connect_database')
    def test_login_success(self, mock_connect_db): # mock_connect_db is the fake version of connect_database()
        controller = LoginController()

        mock_conn = Mock()
        mock_cursor = Mock()
        mock_conn.cursor.return_value = mock_cursor

        # simulate what the database would fetch
        mock_cursor.fetchone.return_value = {
            "username": "admin1",
            "password": "123",
            "role": "admin",
            "status": "active"
        }

        # simulate when controller.login_user() calls connect_database()
        mock_connect_db.return_value = mock_conn

        # call real login function with test inputs (but internally all db access is fake)
        result = controller.login_user("admin1", "123", "admin")

        # verify that login succeeds becos simulated with correct user credentials
        self.assertTrue(result)

    @patch.object(ConnectDB, 'connect_database')
    def test_login_fail_wrong_password(self, mock_connect_db):
        controller = LoginController()

        mock_conn = Mock()
        mock_cursor = Mock()
        mock_conn.cursor.return_value = mock_cursor

        # fetchone returns None
        mock_cursor.fetchone.return_value = None

        mock_connect_db.return_value = mock_conn

        # simulate with incorrect credentials
        result = controller.login_user("admin1", "wrongpassword", "admin")

        self.assertFalse(result)

if __name__ == "__main__":
    unittest.main()




# So this test is for:
# If i give specific inputs to the function
# Then does the function behave correctly (return True or False)