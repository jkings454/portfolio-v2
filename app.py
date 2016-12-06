from flask import Flask
from config import Config

app = Flask(__name__)

app_config = Config().development()

@app.route("/")
def index():
    return "Hello world!"

if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
