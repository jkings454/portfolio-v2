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
    def __init__(self, db_uri="", debug=False, host="", port=0, aws_id="", aws_secret="", bucket=""):
        self.db_uri = db_uri
        self.debug = debug
        self.host = host
        self.port = port
        self.aws_id = aws_id
        self.aws_secret = aws_secret
        self.bucket = bucket

    @staticmethod
    def development():
        """
        NOTICE: A secrets.json file is REQUIRED for this to work.
        """
        fo = open("secrets.json")
        secrets = json.load(fo)
        fo.close()

        return Config(secrets["db_path"], True, "127.0.0.1", 3000,
                      secrets["s3_access_id"], secrets["s3_secret"], secrets["s3_bucket"])

    @staticmethod
    def production():
        database_url = os.environ["DATABASE_URL"]
        aws_id = os.environ["AWS_ACCESS_ID"]
        aws_secret = os.environ["AWS_SECRET_KEY"]
        return Config(database_url, False, "0.0.0.0", 80, aws_id, aws_secret)
