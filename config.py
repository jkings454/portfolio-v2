"""
Helper class to store config variables.
"""
import json
import os

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
        NOTICE: A secrets.json file is REQUIRED for this to work.
        """
        fo = open("secrets.json")
        secrets = json.load(fo)
        fo.close()

        return Config(secrets["db_path"], True, "127.0.0.1", 3000)

    @staticmethod
    def production():
        db_uri = os.environ["DATABASE_URL"]
        return Config(db_uri, False, "0.0.0.0", 80)
