import os

class Config:
    def __init__(self, db_uri, debug, host, port):
        self.db_uri = db_uri
        self.debug = debug
        self.host = host
        self.port = port

DEVELOPMENT = Config(os.environ("PORTFOLIO_URI"), True, "127.0.0.1", 3000)
