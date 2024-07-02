# registration/custom_user.py

class CustomUser:
    def __init__(self, user_data):
        self.id = user_data.get('_id')
        self.email = user_data.get('email')

    @property
    def pk(self):
        return self.id
