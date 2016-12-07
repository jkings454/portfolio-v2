"""
Helper class to store config variables.
"""
import os

class Config:
    """
    Types: development, production
    Usage: Config().(TYPE)()
    """
    def __init__(self):
        self.db_uri = ""
        self.debug = False
        self.host = ""
        self.port = 0

    def development(self):
        """
        In this configuration the database uri is set to the environment variable "PORTFOLIO_URI"
        debug is set to True, the host is set to localhost, and the port is by default 3000.
        """
        self.db_uri = os.environ["PORTFOLIO_URI"]
        self.debug = True
        self.host = "127.0.0.1"
        self.port = 3000
        return self
