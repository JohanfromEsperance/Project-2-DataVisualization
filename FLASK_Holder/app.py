from flask import Flask, render_template
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd

app = Flask(__name__)

# Create a function to handle database connection and queries
def get_data():
    engine = create_engine('sqlite:///database.db')
    Session = sessionmaker(bind=engine)
    session = Session()

    # First query
    query = '''SELECT "Condition Point", COUNT(*) as Count
    FROM database
    GROUP BY "Condition Point"'''

    # Second query
    query2 = '''WITH cte AS (
    SELECT "Level", "Condition Point"
    FROM database
)
SELECT "Level",
       SUM(CASE WHEN "Condition Point" = '0' THEN 1 ELSE 0 END) AS "0",
       SUM(CASE WHEN "Condition Point" = '1' THEN 1 ELSE 0 END) AS "1",
       SUM(CASE WHEN "Condition Point" = '2' THEN 1 ELSE 0 END) AS "2",
       SUM(CASE WHEN "Condition Point" = '3' THEN 1 ELSE 0 END) AS "3",
       SUM(CASE WHEN "Condition Point" = '4' THEN 1 ELSE 0 END) AS "4",
       SUM(CASE WHEN "Condition Point" = '5' THEN 1 ELSE 0 END) AS "5"
FROM cte
GROUP BY "Level";
'''

    # Fetch the data using pandas
    data = pd.read_sql_query(query, engine)
    data2 = pd.read_sql_query(query2, engine)

    # Return the data as a dictionary
    return data.to_dict(orient='records'), data2.to_dict(orient='records')

# Create a route for the homepage
@app.route('/')
def index():
    data, data2 = get_data()
    rendered_template = render_template('project3index2.html', data=data, data2=data2)
    with open('project3index2.html', 'w') as f:
        f.write(rendered_template)
    return rendered_template

if __name__ == '__main__':
    app.run(debug=True)
