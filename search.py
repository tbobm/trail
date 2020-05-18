"""Query program for trail."""
import sys
import os

import pymongo


def main():
    uri = os.environ.get("MONGODB_URI")
    database = pymongo.MongoClient(uri).get_default_database()

    try:
        query = sys.argv[1]
    except IndexError:
        print("Usage: ./search.py term", file=sys.stderr)
        sys.exit(1)

    docs = database.logs.find({
        "message": {
            "$regex": f".*{query}.*",
        },
    }, {
        '@timestamp': 1,
        'message': 1,
        '_id': 0,
    }, ).sort('@timestamp')
    print('@timestamp,message')
    for doc in docs:
        print(doc['@timestamp'], doc['message'], sep=',')


if __name__ == '__main__':
    main()
