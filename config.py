import os

class Config:
    def __init__(self):
        self.db_uri = ""
        self.debug = False
        self.host = ""
        self.port = 0
    
    def development(self):
        self.db_uri = os.environ["PORTFOLIO_URI"]
        self.debug = False
        self.host = "127.0.0.1"
        self.port = 3000
        return self
