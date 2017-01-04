"""
Helper class to store config variables.
"""
import json


class Config:
    """
    Types: development, production
    Usage: Config.(TYPE)()
    """
    def __init__(self, db_uri="", debug=False, host="", port=0):
        self.db_uri = db_uri
        self.debug = debug
        self.host = host
        self.port = port

    @staticmethod
    def development():
        """
        In this configuration the database uri is set to the environment variable "PORTFOLIO_URI"
        debug is set to True, the host is set to localhost, and the port is by default 3000.
        """
        fo = open("/home/josh/Projects/portfolio-v2/secrets.json")
        secrets = json.load(fo)
        fo.close()

        return Config(secrets["db_path"], True, "127.0.0.1", 3000)
