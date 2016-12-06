from flask import Flask
import config

app = Flask(__name__)

app_config = config.DEVELOPMENT

@app.route("/")
def index():
    return "Hello world!"

if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
